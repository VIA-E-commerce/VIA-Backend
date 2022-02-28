import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

import { SwaggerFieldDoc } from '@/common';

import { PRODUCT_GROUP } from '../../product.constant';
import { ProductGroup } from '../product-group.entity';

export const ProductGroupMetaInfo: SwaggerFieldDoc<ProductGroup> = {
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
