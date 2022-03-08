import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { AddressResponse } from './dto';

export const AddressControllerDoc = {
  register(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '주소 및 수령인 정보를 서버에 등록합니다.',
      }),
    );
  },

  getOne(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '주소 식별자로 주소 상세 정보를 조회합니다.',
      }),
      ApiOkResponse({
        description: '주소 상세 정보 조회 성공',
        type: AddressResponse,
      }),
    );
  },

  remove(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '주소 정보를 삭제합니다.',
      }),
    );
  },
};
