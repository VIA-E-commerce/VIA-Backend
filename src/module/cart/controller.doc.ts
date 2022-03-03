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

  delete(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '장바구니에 등록된 상품을 하나 제거합니다.',
      }),
    );
  },
};
