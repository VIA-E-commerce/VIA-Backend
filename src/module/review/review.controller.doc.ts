import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

export const ReviewControllerDoc = {
  addReview(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '상품 구매 리뷰를 등록합니다.',
      }),
      ApiCreatedResponse({
        description: '리뷰 등록 성공',
      }),
    );
  },
};
