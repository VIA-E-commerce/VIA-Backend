import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { QuestionResponse } from './dto';

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

  getQuestion(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          '상품 문의의 상세 정보를 조회하며, 비밀 글일 경우 접근 권한을 검사합니다.',
      }),
      ApiOkResponse({
        description: '상품 문의 조회 성공',
        type: QuestionResponse,
      }),
      ApiForbiddenResponse({
        description: '비밀 글 접근 불가',
      }),
      ApiNotFoundResponse({
        description: '존재하지 않는 상품 문의',
      }),
    );
  },

  removeQuestion(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '회원 본인이 작성한 상품 문의 하나를 삭제합니다.',
      }),
      ApiOkResponse({
        description: '상품 문의 삭제 성공',
      }),
      ApiBadRequestResponse({
        description: '잘못된 요청으로 제거 실패',
      }),
    );
  },
};
