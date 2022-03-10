import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const QuestionControllerDoc = {
  registerQuestion(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '상품 식별자와 상품 문의 폼을 입력받아 서버에 등록합니다.',
      }),
      ApiCreatedResponse({
        description: '상품 문의 등록 성공',
      }),
      ApiBadRequestResponse({
        description: '잘못된 요청으로 등록 실패',
      }),
    );
  },
};
