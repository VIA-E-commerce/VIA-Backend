import { SwaggerMethodDoc } from '@/common';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { MESSAGE } from '@/constant';

import { LoginForm, LoginResponse } from './dto';
import { AuthController } from './auth.controller';

export const Docs: SwaggerMethodDoc<AuthController> = {
  join(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '회원가입 양식을 받아 신규 회원으로 등록합니다.',
      }),
      ApiCreatedResponse({ description: '회원가입 성공' }),
      ApiBadRequestResponse({ description: '잘못된 인증 정보 입력' }),
      ApiInternalServerErrorResponse({
        description: MESSAGE.SWAGGER.INTERNAL_SERVER_ERROR,
      }),
    );
  },

  login(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          '입력받은 회원의 이메일과 비밀번호로 인증 과정을 거친 뒤 JWT를 발급합니다.',
      }),
      ApiBody({
        type: LoginForm,
      }),
      ApiOkResponse({ description: '로그인 성공', type: LoginResponse }),
      ApiInternalServerErrorResponse({
        description: MESSAGE.SWAGGER.INTERNAL_SERVER_ERROR,
      }),
    );
  },

  kakao(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '카카오 아이디로 회원가입/로그인을 진행합니다.',
      }),
    );
  },

  kakaoCallback(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '카카오 OAuth 인증 성공 시 실행되는 콜백 API입니다.',
      }),
    );
  },
};
