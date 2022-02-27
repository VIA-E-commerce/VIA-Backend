import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

import { SwaggerFieldDoc } from '@/common';

import { UserRole, SNSProvider } from '../enum';
import { USER } from '../user.constant';
import { User } from './user.entity';

export const UserDocs: SwaggerFieldDoc<User> = {
  id() {
    return applyDecorators(
      ApiProperty({
        description: '아이디',
        example: '1',
        required: true,
      }),
      PrimaryGeneratedColumn(),
    );
  },

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
      Column({
        unique: true,
        length: USER.EMAIL.MAX_LENGTH,
      }),
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
      Column({
        length: USER.PASSWORD.MAX_LENGTH,
        nullable: true,
        select: false,
      }),
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
      Column({
        length: USER.NAME.MAX_LENGTH,
      }),
    );
  },

  role() {
    return applyDecorators(
      Column({
        default: UserRole.USER,
      }),
    );
  },

  provider() {
    return applyDecorators(
      Column({
        default: SNSProvider.LOCAL,
      }),
    );
  },

  snsId() {
    return applyDecorators(
      Column({
        nullable: true,
      }),
    );
  },

  refreshToken() {
    return applyDecorators(
      Column({
        nullable: true,
        select: false,
      }),
    );
  },
};
