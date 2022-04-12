import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';

export const OrderDetailDoc = {
  orderDetailId() {
    return applyDecorators(SwaggerDoc.id('주문 상세 식별자'));
  },

  price() {
    return applyDecorators(
      ApiProperty({
        description: '가격',
        example: 10000,
      }),
    );
  },

  quantity() {
    return applyDecorators(
      ApiProperty({
        description: '수량',
        example: 1,
      }),
    );
  },
};
