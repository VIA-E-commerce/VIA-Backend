import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CartRepository])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
