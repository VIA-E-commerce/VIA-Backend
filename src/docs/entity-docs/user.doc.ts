import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

import { USER } from '@/models';

export const UserDoc = {
  email() {
    return applyDecorators(
      ApiProperty({
        description: '이메일',
        example: 'user@example.com',
      }),
      IsEmail({}, { message: USER.EMAIL.MESSAGE.IS_EMAIL }),
      IsNotEmpty({ message: USER.EMAIL.MESSAGE.IS_NOT_EMPTY }),
      MaxLength(USER.EMAIL.MAX_LENGTH),
    );
  },

  password() {
    return applyDecorators(
      ApiProperty({
        description: '비밀번호',
        example: '12345678',
      }),
      IsNotEmpty({ message: USER.PASSWORD.MESSAGE.IS_NOT_EMPTY }),
      Length(USER.PASSWORD.MIN_LENGTH, USER.PASSWORD.MAX_LENGTH),
    );
  },

  name() {
    return applyDecorators(
      ApiProperty({
        description: '회원의 실명',
        example: '홍길동',
      }),
      Length(USER.NAME.MIN_LENGTH, USER.NAME.MAX_LENGTH),
    );
  },

  phone() {
    return applyDecorators(
      ApiProperty({
        description: '휴대폰 번호',
        example: '01012345678',
      }),
      Length(USER.PHONE.MIN_LENGTH, USER.PHONE.MAX_LENGTH),
    );
  },

  role() {
    return applyDecorators(
      ApiProperty({
        description: '회원 권한',
        example: 'USER',
      }),
    );
  },

  provider() {
    return applyDecorators(
      ApiProperty({
        description: '로그인 서비스 제공사',
        example: 'LOCAL',
      }),
    );
  },

  snsId() {
    return applyDecorators(
      ApiProperty({
        description: '연동된 SNS 아이디',
        example: 1633204891,
      }),
    );
  },
};
