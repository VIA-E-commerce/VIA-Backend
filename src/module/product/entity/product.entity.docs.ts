import { SwaggerFieldDoc } from '@/common';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from './product.entity';
import { PRODUCT } from '../product.constant';

export const ProductDocs: SwaggerFieldDoc<Product> = {
  id() {
    return applyDecorators(
      ApiProperty({
        description: '아이디',
        example: 1,
        required: true,
      }),
      PrimaryGeneratedColumn({
        unsigned: true,
      }),
    );
  },

  name() {
    return applyDecorators(
      Column({
        length: PRODUCT.NAME.MAX_LENGTH,
      }),
    );
  },

  retailPrice() {
    return applyDecorators(
      Column({
        type: 'mediumint',
        unsigned: true,
        nullable: true,
      }),
    );
  },

  sellingPrice() {
    return applyDecorators(
      Column({
        type: 'mediumint',
        unsigned: true,
        default: 0,
      }),
    );
  },

  // 통계 속성
  salesVolume() {
    return applyDecorators(
      Column({
        unsigned: true,
        default: 0,
      }),
    );
  },

  reviewCount() {
    return applyDecorators(
      Column({
        unsigned: true,
        default: 0,
      }),
    );
  },

  wishCount() {
    return applyDecorators(
      Column({
        unsigned: true,
        default: 0,
      }),
    );
  },

  // check 옵션
  show() {
    return applyDecorators(
      Column({
        type: 'tinyint',
        default: 1,
      }),
    );
  },

  onSale() {
    return applyDecorators(
      Column({
        type: 'tinyint',
        default: 1,
      }),
    );
  },
};
