import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { CartItemResponse } from './dto';

export const CartControllerDoc = {
  create(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '장바구니에 상품을 담습니다.',
      }),
    );
  },

  getMyCart(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '로그인된 회원의 장바구니에 담긴 상품 목록을 가져옵니다.',
      }),
      ApiOkResponse({
        type: [CartItemResponse],
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
