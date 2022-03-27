import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PagingQuery } from '@/common';
import { CurrentUser, JwtAuthGuard } from '@/module/auth';
import { User } from '@/module/user';

import {
  CreateOrderRequest,
  EditOrderRequest,
  OrderIdParam,
  OrderResponse,
} from './dto';
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
  ): Promise<number> {
    return this.orderService.register(dto, user);
  }

  @Doc.getOne('주문 조회')
  @Get(':id(\\d+)')
  @UseGuards(JwtAuthGuard)
  async getOne(
    @Param() { id }: OrderIdParam,
    @CurrentUser() user: User,
  ): Promise<OrderResponse> {
    return this.orderService.getOne(id, user);
  }

  @Doc.getMe('내 주문 목록 조회')
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(
    @Param() pagingQuery: PagingQuery,
    @CurrentUser() user: User,
  ): Promise<OrderResponse[]> {
    return this.orderService.getMe(pagingQuery, user);
  }

  @Doc.edit('주문 정보 수정')
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async edit(
    @Param() { id }: OrderIdParam,
    @Body() dto: EditOrderRequest,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.orderService.edit(id, dto, user);
  }

  @Doc.cancel('주문 취소')
  @Patch(':id/cancel')
  @UseGuards(JwtAuthGuard)
  async cancel(
    @Param() { id }: OrderIdParam,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.orderService.cancel(id, user);
  }
}
