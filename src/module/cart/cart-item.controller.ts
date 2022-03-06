import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser, JwtAuthGuard } from '@/module/auth';
import { User } from '@/module/user';

import { AddCartItemRequest, CartItemResponse, CartItemIdParam } from './dto';
import { CartService } from './cart.service';
import { CartItemControllerDoc as Doc } from './controller.doc';

@ApiTags('장바구니 API')
@Controller('cart-items')
export class CartItemController {
  constructor(private readonly cartService: CartService) {}

  @Doc.add('장바구니에 상품 추가')
  @Post()
  @UseGuards(JwtAuthGuard)
  async add(@Body() dto: AddCartItemRequest, @CurrentUser() user: User) {
    await this.cartService.addItem(dto, user);
  }

  @Doc.getAll('장바구니 상품 목록 조회')
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@CurrentUser() user: User): Promise<CartItemResponse[]> {
    return this.cartService.getAllItems(user);
  }

  @Doc.remove('장바구니에서 상품 제거')
  @Delete('variant/:variantId')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param() { variantId }: CartItemIdParam,
    @CurrentUser() user: User,
  ) {
    await this.cartService.removeItem(variantId, user);
  }
}
