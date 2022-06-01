import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import {
  getPagination,
  handleException,
  Pagination,
  PagingQuery,
  throwExceptionOrNot,
  useTransaction,
} from '@/common';
import { BUSINESS } from '@/constants';
import { EXCEPTION } from '@/docs';
import {
  CartItem,
  User,
  UserRole,
  Product,
  Variant,
  Order,
  OrderDetail,
  OrderStatus,
} from '@/models';
import { PaymentService } from '@/modules/payment';

import { CreateOrderRequest, EditOrderRequest, OrderResponse } from './dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    private readonly paymentService: PaymentService,
  ) {}

  /**
   * DTO : ① 배송 기본 정보 ② 주문할 아이템 ID 목록을 받아옵니다.
   *
   * - Logic A : 가격 정보를 처리합니다.
   *
   * * Mapping 주문 : DTO + 가격 정보 + User
   * * Mapping 주문 상세 : Order + CartItem + Variant + Product 가격
   *
   * 를 가공해 DB에 저장합니다.
   *  */
  async register(dto: CreateOrderRequest, user: User): Promise<number> {
    const cartItems = await this.cartItemRepository.findByIds(dto.cartItemIds, {
      relations: ['cart', 'variant', 'variant.product'],
      where: {
        cart: {
          user,
        },
      },
    });

    // Logic A : 가격 정보 계산
    const [totalPrice, paymentReal] = this.calcOrderPrices(cartItems);

    // 결제 위변조 검사
    const { merchantUID, paidAt, paymentMethod, orderStatus } =
      await this.paymentService.verify(dto.impUID, 100);

    // DB 저장
    let response: number;

    await useTransaction(this.connection, async (manager) => {
      // 주문 Mapping : DTO → 주문 Entity
      const order = dto.toEntity(user, totalPrice, paymentReal);
      order.orderDetails = this.mapCartItemsToOrderDetails(cartItems);
      order.merchantUID = merchantUID;
      order.paidAt = paidAt;
      order.paymentMethod = paymentMethod;
      order.status = orderStatus;

      // 결제 완료 시 order에 적립할 금액 저장
      if (orderStatus === OrderStatus.PAYMENT_ACCEPTED) {
        order.point = paymentReal * BUSINESS.POINT_EARNING_RATE;
      }

      // 주문 등록
      const orderRepository = manager.getRepository(Order);

      const savedOrder = await orderRepository.save(order);

      throwExceptionOrNot(savedOrder, EXCEPTION.ORDER.CREATE_ERROR);

      // 아이템 판매처리
      cartItems.forEach(async (item) => {
        const { variant } = item;

        const calcedQuantity = variant.quantity - item.quantity;
        throwExceptionOrNot(calcedQuantity >= 0, EXCEPTION.ORDER.OUT_OF_STOCK);

        variant.quantity = calcedQuantity;

        variant.product.salesVolume += item.quantity;

        await manager.getRepository(Variant).save(variant);
      });

      // 판매 처리된 장바구니 아이템 제거
      await manager.getRepository(CartItem).remove(cartItems);

      response = savedOrder.id;
    });

    return response;
  }

  async getOne(id: number, user: User): Promise<OrderResponse> {
    const order = await this.orderRepository.findOne(id, {
      where: {
        user,
      },
    });

    throwExceptionOrNot(order, EXCEPTION.ORDER.NOT_FOUND);

    return new OrderResponse(order);
  }

  async getMe(
    { pageNum, pageSize }: PagingQuery,
    user: User,
  ): Promise<Pagination<OrderResponse>> {
    const [orders, count] = await this.orderRepository.findAndCount({
      where: {
        user,
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    const list = orders.map((order) => new OrderResponse(order));

    return getPagination(list, count, { pageNum, pageSize });
  }

  async edit(id: number, dto: EditOrderRequest, user: User) {
    if (user.role === UserRole.USER && dto.status) {
      switch (dto.status) {
        case OrderStatus.AWAITING_SHIPMENT:
        case OrderStatus.SHIPPED:
        case OrderStatus.DELIVERED:
        case OrderStatus.EXCHANGED:
        case OrderStatus.REFUNDED:
          handleException(EXCEPTION.COMMON.FORBIDDEN);
        default:
          break;
      }
    }

    const result = await this.orderRepository.update({ id, user }, dto);

    throwExceptionOrNot(result.affected, EXCEPTION.ORDER.NOT_FOUND);
  }

  async cancel(id: number, user: User): Promise<void> {
    await useTransaction(this.connection, async (manager) => {
      const orderRepository = manager.getRepository(Order);
      const variantRepository = manager.getRepository(Variant);
      const productRepository = manager.getRepository(Product);

      const order = await orderRepository.findOne(id, {
        relations: [
          'orderDetails',
          'orderDetails.variant',
          'orderDetails.variant.product',
        ],
        where: { user },
      });

      throwExceptionOrNot(order, EXCEPTION.ORDER.NOT_FOUND);

      throwExceptionOrNot(
        order.status === OrderStatus.AWAITING_PAYMENT ||
          order.status === OrderStatus.PAYMENT_ACCEPTED,
        EXCEPTION.ORDER.CANCEL_NOT_ALLOWED,
      );

      // 취소 수량 되돌리기
      order.orderDetails.forEach(async (orderDetail) => {
        const variant = orderDetail.variant;
        const product = variant.product;

        variant.quantity += orderDetail.quantity;

        const calcedSalesVolume = product.salesVolume - orderDetail.quantity;
        product.salesVolume = Math.max(0, calcedSalesVolume);

        await variantRepository.save(variant);
        await productRepository.save(product);
      });

      order.status = OrderStatus.CANCELLED;

      await orderRepository.save(order);
    });
  }

  private calcOrderPrices(cartItems: CartItem[]): [number, number] {
    let [totalPrice, paymentReal] = [0, 0];

    cartItems.forEach(async (item) => {
      const { retailPrice, sellingPrice } = item.variant.product;
      const { quantity } = item;

      totalPrice += retailPrice * quantity;
      paymentReal += sellingPrice * quantity;
    });

    // Logic B : 주문 금액이 적으면 배송비 추가
    if (paymentReal < BUSINESS.MINIMUM_AMOUNT_FOR_FREE_SHIPPING) {
      paymentReal += BUSINESS.SHIPPING_FEE;
    }

    return [totalPrice, paymentReal];
  }

  private mapCartItemsToOrderDetails(cartItems: CartItem[]) {
    return cartItems.map((item) => {
      const { sellingPrice } = item.variant.product;
      const { quantity, variant } = item;

      return this.orderDetailRepository.create({
        price: sellingPrice,
        quantity: quantity,
        variant: variant,
      });
    });
  }
}
