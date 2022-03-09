import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

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

  remove(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '상품 리뷰를 삭제합니다.',
      }),
      ApiOkResponse({
        description: '리뷰 삭제 성공',
      }),
      ApiNotFoundResponse({
        description: '존재하지 않는 리뷰',
      }),
      ApiInternalServerErrorResponse({
        description: '서버 내부 오류 발생',
      }),
    );
  },
};
