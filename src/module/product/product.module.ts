import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ProductRepository,
  CategoryRepository,
  ColorRepository,
  SizeValueRepository,
  WishlistRepository,
} from '@/models';
import { ReviewModule } from '@/module/review';
import { QuestionModule } from '@/module/question';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryRepository,
      ProductRepository,
      ColorRepository,
      SizeValueRepository,
      WishlistRepository,
    ]),
    ReviewModule,
    QuestionModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
