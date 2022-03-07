import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Variant } from '@/module/product';

import { CartItem } from './entity';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItemController } from './cart-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CartRepository, CartItem, Variant])],
  controllers: [CartController, CartItemController],
  providers: [CartService],
})
export class CartModule {}
