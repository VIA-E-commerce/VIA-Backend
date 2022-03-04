import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartItem } from './entity';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';
import { CartItemController } from './cart-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CartRepository, CartItem])],
  controllers: [CartItemController],
  providers: [CartService],
})
export class CartModule {}
