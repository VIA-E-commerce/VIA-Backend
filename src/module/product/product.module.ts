import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColorRepository } from '@/module/color';
import { ReviewModule } from '@/module/review';
import { SizeValueRepository } from '@/module/size';
import { QuestionModule } from '@/module/question';
import { Wishlist } from '@/module/wishlist';

import { Product } from './entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
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
