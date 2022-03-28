import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { UserResponse } from './dto';

export const UserControllerDoc = {
  getMe(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '로그인된 회원 본인의 요약된 정보를 가져옵니다.',
      }),
      ApiOkResponse({
        type: UserResponse,
      }),
    );
  },

  getMyWishlist(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '로그인된 회원이 추가한 위시리스트를 가져옵니다.',
      }),
      ApiOkResponse({
        description: '내 위시리스트 목록 조회 성공',
      }),
    );
  },
};
