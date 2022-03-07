import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser, JwtAuthGuard } from '@/module/auth';
import { User } from '@/module/user';

import { CartItemResponse } from './dto';
import { CartService } from './cart.service';
import { CartControllerDoc as Doc } from './controller.doc';

@ApiTags('장바구니 API')
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Doc.getMyCartItems('장바구니 상품 목록 조회')
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getMyCartItems(@CurrentUser() user: User): Promise<CartItemResponse[]> {
    return this.cartService.getMyCartItems(user);
  }
}
