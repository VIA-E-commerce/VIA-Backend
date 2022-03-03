import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IdParam } from '@/common';
import { CurrentUser, JwtAuthGuard } from '@/module/auth';
import { User } from '@/module/user';

import { CreateCartRequest } from './dto';
import { CartService } from './cart.service';
import { CartControllerDoc as Doc } from './controller.doc';

@ApiTags('장바구니 API')
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Doc.create('장바구니에 상품 추가')
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateCartRequest, @CurrentUser() user: User) {
    await this.cartService.create(dto, user);
  }

  @Doc.delete('장바구니에서 상품 제거')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param() { id }: IdParam, @CurrentUser() user: User) {
    await this.cartService.remove(id, user);
  }
}
