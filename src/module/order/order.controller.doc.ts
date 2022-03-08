import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const OrderControllerDoc = {
  register(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '주문 데이터를 받아와 저장합니다.',
      }),
      ApiCreatedResponse({
        description: '주문 등록 성공',
      }),
      ApiInternalServerErrorResponse({
        description: '서버 내부 오류 발생',
      }),
    );
  },

  getOne(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '주문 데이터를 조회합니다.',
      }),
    );
  },
};
