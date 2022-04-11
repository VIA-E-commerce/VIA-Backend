import { applyDecorators } from '@nestjs/common';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

import { SwaggerEntityDoc } from '@/common';

import { USER } from '../constants';
import { User } from '../entities';

export const UserValidation: SwaggerEntityDoc<User> = {
  email() {
    return applyDecorators(
      IsEmail({}, { message: USER.EMAIL.IS_EMAIL_MESSAGE }),
      MaxLength(USER.EMAIL.MAX_LENGTH, {
        message: USER.EMAIL.MAX_LENGTH_MESSAGE,
      }),
    );
  },

  password() {
    return applyDecorators(
      Matches(USER.PASSWORD.REG_EXP, {
        message: USER.PASSWORD.MATCHES_MESSAGE,
      }),
    );
  },

  name() {
    return applyDecorators(
      Length(USER.NAME.MIN_LENGTH, USER.NAME.MAX_LENGTH, {
        message: USER.NAME.LENGTH_MESSAGE,
      }),
      Matches(/^[a-zA-Z가-힣]+$/, {
        message: USER.NAME.MATCHES_MESSAGE,
      }),
    );
  },

  phone() {
    return applyDecorators(
      Length(USER.PHONE.MIN_LENGTH, USER.PHONE.MAX_LENGTH, {
        message: USER.PHONE.LENGTH_MESSAGE,
      }),
    );
  },

  provider() {
    return applyDecorators(
      IsNotEmpty({ message: USER.PROVIDER.IS_NOT_EMPTY }),
      IsString({ message: USER.PROVIDER.IS_STRING_MESSAGE }),
    );
  },

  snsId() {
    return applyDecorators(
      IsNotEmpty({ message: USER.SNS_ID.IS_NOT_EMPTY }),
      IsString({ message: USER.SNS_ID.IS_STRING_MESSAGE }),
    );
  },
};
