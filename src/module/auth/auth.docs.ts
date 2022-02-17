import { AuthController } from './auth.controller';

import { SwaggerMethodDoc } from '@/common';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const Docs: SwaggerMethodDoc<AuthController> = {
  join(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '회원가입 양식을 받아 신규 회원으로 등록합니다.',
      }),
      ApiCreatedResponse({ description: '회원가입 성공' }),
      ApiBadRequestResponse({ description: '잘못된 인증 정보 입력' }),
      ApiInternalServerErrorResponse({ description: '알 수 없는 서버 오류' }),
    );
  },
};
