import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Product,
  Category,
  Wishlist,
  ColorRepository,
  SizeValueRepository,
} from '@/models';
import { ReviewModule } from '@/module/review';
import { QuestionModule } from '@/module/question';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Category,
      ColorRepository,
      SizeValueRepository,
      Wishlist,
    ]),
    ReviewModule,
    QuestionModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
