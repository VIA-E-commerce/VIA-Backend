import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser, JwtAuthGuard } from '@/module/auth';
import { User } from '@/module/user';

import { CreateOrderRequest, OrderIdParam, OrderResponse } from './dto';
import { OrderService } from './order.service';
import { OrderControllerDoc as Doc } from './order.controller.doc';

@ApiTags('주문 API')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Doc.register('주문 등록')
  @Post()
  @UseGuards(JwtAuthGuard)
  async register(
    @Body() dto: CreateOrderRequest,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.orderService.register(dto, user);
  }

  @Doc.getOne('주문 조회')
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(
    @Param() { id }: OrderIdParam,
    @CurrentUser() user: User,
  ): Promise<OrderResponse> {
    return this.orderService.getOne(id, user);
  }
}
