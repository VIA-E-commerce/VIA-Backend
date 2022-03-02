import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser, JwtAuthGuard } from '@/module/auth';
import { User } from '@/module/user';

import { CartControllerDoc as Doc } from './doc';
import { CreateCartDto } from './dto';
import { CartService } from './cart.service';

@ApiTags('장바구니 API')
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Doc.create('장바구니에 상품 추가')
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateCartDto, @CurrentUser() user: User) {
    await this.cartService.create(dto, user);
  }
}
