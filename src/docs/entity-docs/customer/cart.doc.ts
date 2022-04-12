import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';

export const CartDoc = {
  cartId() {
    return applyDecorators(SwaggerDoc.id('장바구니 식별자'));
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
