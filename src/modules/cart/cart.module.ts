import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartItem, CartRepository, Variant } from '@/models';

import { CartService } from './cart.service';
import { CartItemController } from './cart-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CartRepository, CartItem, Variant])],
  controllers: [CartItemController],
  providers: [CartService],
})
export class CartModule {}
