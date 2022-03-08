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

  getMe(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '로그인된 회원 본인의 주문 목록을 조회합니다.',
      }),
    );
  },

  cancel(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '주문을 취소 상태로 변경합니다.',
      }),
    );
  },
};
