import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

import { USER } from '../user.constant';

export const UserDoc = {
  email() {
    return applyDecorators(
      ApiProperty({
        description: '이메일',
        example: 'user@example.com',
        required: true,
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
        required: true,
      }),
      Length(USER.NAME.MIN_LENGTH, USER.NAME.MAX_LENGTH),
    );
  },
};
