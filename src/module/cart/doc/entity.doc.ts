import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const CartDoc = {
  quantity() {
    return applyDecorators(
      ApiProperty({
        description: '수량',
        example: 1,
      }),
    );
  },

  variantId() {
    return applyDecorators(
      ApiProperty({
        description: '상품 품목 식별자',
        example: 1,
      }),
    );
  },
};
