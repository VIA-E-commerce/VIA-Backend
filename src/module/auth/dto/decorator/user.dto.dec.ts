import { applyDecorators } from '@nestjs/common';

import { SwaggerDoc } from '@/common';
import { UserDoc } from '@/docs';
import { UserValidation } from '@/models';

export const UserDtoDec = {
  userId() {
    return applyDecorators(SwaggerDoc.id('회원 식별자'));
  },

  email() {
    return applyDecorators(UserDoc.email(), UserValidation.email());
  },

  password() {
    return applyDecorators(UserDoc.password(), UserValidation.password());
  },

  name() {
    return applyDecorators(UserDoc.name(), UserValidation.name());
  },

  phone() {
    return applyDecorators(UserDoc.phone(), UserValidation.phone());
  },

  provider() {
    return applyDecorators(UserDoc.provider(), UserValidation.provider());
  },

  snsId() {
    return applyDecorators(UserDoc.snsId(), UserValidation.snsId());
  },
};
