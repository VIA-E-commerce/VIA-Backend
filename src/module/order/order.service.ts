import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/module/user';

import { CreateOrderRequest } from './dto';
import { Order } from './entity';
import { ORDER_ERROR } from './order.constant';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async register(dto: CreateOrderRequest, user: User): Promise<void> {
    const requestOrder = dto.toEntity(user);
    const savedOrder = await this.orderRepository.save(requestOrder);

    if (!savedOrder) {
      throw new HttpException(
        ORDER_ERROR.CREATE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
