import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

import { PRODUCT, PRODUCT_GROUP } from '../product.constant';

export const ProductDoc = {
  name() {
    return applyDecorators(
      ApiProperty({
        description: '상품명',
        example: '남녀공용 기모 오버핏 무지 맨투맨',
        required: true,
      }),
      Column({
        length: PRODUCT.NAME.MAX_LENGTH,
      }),
    );
  },

  retailPrice() {
    return applyDecorators(
      ApiProperty({
        description: '소비자가',
        example: 39900,
      }),
      Column({
        type: 'mediumint',
        unsigned: true,
        nullable: true,
      }),
    );
  },

  sellingPrice() {
    return applyDecorators(
      ApiProperty({
        description: '판매가',
        example: 19900,
        required: true,
      }),
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
      ApiProperty({
        description: '판매량',
        example: 2761,
      }),
      Column({
        unsigned: true,
        default: 0,
      }),
    );
  },

  reviewCount() {
    return applyDecorators(
      ApiProperty({
        description: '리뷰 수',
        example: 137,
      }),
      Column({
        unsigned: true,
        default: 0,
      }),
    );
  },

  wishCount() {
    return applyDecorators(
      ApiProperty({
        description: '찜 수',
        example: 12,
      }),
      Column({
        unsigned: true,
        default: 0,
      }),
    );
  },

  // check 옵션
  show() {
    return applyDecorators(
      ApiProperty({
        description: '진열 여부',
        example: true,
      }),
      Column({
        type: 'tinyint',
        default: 1,
      }),
    );
  },

  onSale() {
    return applyDecorators(
      ApiProperty({
        description: '판매 여부',
        example: true,
      }),
      Column({
        type: 'tinyint',
        default: 1,
      }),
    );
  },
};

export const ProductGroupDoc = {
  name() {
    return applyDecorators(
      ApiProperty({
        description: '상품 그룹명',
        example: 'OUTER',
        required: true,
      }),
      Column({
        length: PRODUCT_GROUP.NAME.MAX_LENGTH,
      }),
    );
  },

  code() {
    return applyDecorators(
      ApiProperty({
        description: '상품 그룹 코드',
        example: 'outer',
        required: true,
      }),
      Column({
        length: PRODUCT_GROUP.CODE.MAX_LENGTH,
        unique: true,
      }),
    );
  },
};
