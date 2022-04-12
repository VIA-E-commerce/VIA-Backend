import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';
import { USER } from '@/models';

export const UserDoc = {
  userId() {
    return applyDecorators(SwaggerDoc.id('회원 식별자'));
  },

  email() {
    return applyDecorators(
      ApiProperty({
        description: USER.EMAIL.KR,
        example: 'user@example.com',
      }),
    );
  },

  password() {
    return applyDecorators(
      ApiProperty({
        description: USER.PASSWORD.KR,
        example: '12345678',
      }),
    );
  },

  name() {
    return applyDecorators(
      ApiProperty({
        description: '회원의 실명',
        example: '홍길동',
      }),
    );
  },

  phone() {
    return applyDecorators(
      ApiProperty({
        description: USER.PHONE.KR,
        example: '01012345678',
      }),
    );
  },

  role() {
    return applyDecorators(
      ApiProperty({
        description: USER.ROLE.KR,
        example: 'USER',
      }),
    );
  },

  provider() {
    return applyDecorators(
      ApiProperty({
        description: USER.PROVIDER.KR,
        example: 'LOCAL',
      }),
    );
  },

  snsId() {
    return applyDecorators(
      ApiProperty({
        description: USER.SNS_ID.KR,
        example: 1633204891,
      }),
    );
  },
};
