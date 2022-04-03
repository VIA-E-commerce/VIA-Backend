import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PagingQuery } from '@/common';
import { APP, MESSAGE } from '@/constant';
import { CartItem } from '@/module/cart';
import { User, UserRole } from '@/module/user';

import { CreateOrderRequest, EditOrderRequest, OrderResponse } from './dto';
import { Order, OrderDetail } from './entity';
import { OrderStatus } from './enum';
import { ORDER_ERROR } from './order.constant';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  /**
   * DTO : ① 배송 기본 정보 ② 주문할 아이템 ID 목록을 받아옵니다.
   *
   * - Logic A : 가격 정보를 가공합니다.
   * - Logic B : 배송비 추가 여부 및 금액을 결정합니다.
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
    let [totalPrice, paymentReal] = [0, 0];
    cartItems.forEach((item) => {
      const { retailPrice, sellingPrice } = item.variant.product;
      const { quantity } = item;

      totalPrice += retailPrice * quantity;
      paymentReal += sellingPrice * quantity;
    });

    // Logic B : 배송비 추가
    if (paymentReal < APP.MINIMUM_AMOUNT_FOR_FREE_SHIPPING) {
      paymentReal += APP.SHIPPING_FEE;
    }

    // 주문 Mapping : DTO → 주문 Entity
    const requestOrder = dto.toEntity(user, totalPrice, paymentReal);

    // 주문 상세 Mapping : CartItem[] → OrderDetail[]
    requestOrder.orderDetails = cartItems.map((item) => {
      const { sellingPrice } = item.variant.product;
      const { quantity, variant } = item;

      return this.orderDetailRepository.create({
        price: sellingPrice,
        quantity: quantity,
        variant: variant,
      });
    });

    // DB 저장
    const savedOrder = await this.orderRepository.save(requestOrder);

    if (!savedOrder) {
      throw new HttpException(
        ORDER_ERROR.CREATE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return savedOrder.id;
  }

  async getOne(id: number, user: User): Promise<OrderResponse> {
    const order = await this.orderRepository.findOne(id, {
      where: {
        user,
      },
    });

    if (!order) {
      throw new HttpException(ORDER_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return new OrderResponse(order);
  }

  async getMe(
    { pageNum, pageSize }: PagingQuery,
    user: User,
  ): Promise<OrderResponse[]> {
    const orders = await this.orderRepository.find({
      where: {
        user,
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    return orders.map((order) => new OrderResponse(order));
  }

  async edit(id: number, dto: EditOrderRequest, user: User) {
    if (user.role === UserRole.USER && dto.status) {
      switch (dto.status) {
        case OrderStatus.AWAITING_SHIPMENT:
        case OrderStatus.SHIPPED:
        case OrderStatus.DELIVERED:
        case OrderStatus.EXCHANGED:
        case OrderStatus.REFUNDED:
          throw new HttpException(
            MESSAGE.ERROR.FORBIDDEN,
            HttpStatus.FORBIDDEN,
          );
        default:
          break;
      }
    }

    const result = await this.orderRepository.update({ id, user }, dto);

    if (result.affected <= 0) {
      throw new HttpException(ORDER_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  async cancel(id: number, user: User): Promise<void> {
    const result = await this.orderRepository.update(
      { id, user },
      {
        status: OrderStatus.CANCELLED,
      },
    );

    if (result.affected <= 0) {
      throw new HttpException(
        ORDER_ERROR.CANCEL_FAILURE,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
