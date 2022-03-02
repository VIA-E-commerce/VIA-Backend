import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const CartControllerDoc = {
  create(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '장바구니에 상품을 담습니다.',
      }),
    );
  },
};
