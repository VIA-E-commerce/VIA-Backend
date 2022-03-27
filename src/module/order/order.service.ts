import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PagingQuery } from '@/common';
import { MESSAGE } from '@/constant';
import { User, UserRole } from '@/module/user';

import { CreateOrderRequest, EditOrderRequest, OrderResponse } from './dto';
import { Order } from './entity';
import { OrderStatus } from './enum';
import { ORDER_ERROR } from './order.constant';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async register(dto: CreateOrderRequest, user: User): Promise<number> {
    const requestOrder = dto.toEntity(user);
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
