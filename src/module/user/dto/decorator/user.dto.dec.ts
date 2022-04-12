import { applyDecorators } from '@nestjs/common';

import { SwaggerValidation } from '@/common';
import { UserDoc } from '@/docs';
import { UserValidation } from '@/models';

export const UserRequestDec = {
  userId() {
    return applyDecorators(UserDoc.userId(), SwaggerValidation.id());
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

export const UserResponseDec = {
  userId() {
    return applyDecorators(UserDoc.userId());
  },

  email() {
    return applyDecorators(UserDoc.email());
  },

  password() {
    return applyDecorators(UserDoc.password());
  },

  name() {
    return applyDecorators(UserDoc.name());
  },

  phone() {
    return applyDecorators(UserDoc.phone());
  },

  role() {
    return applyDecorators(UserDoc.role());
  },

  provider() {
    return applyDecorators(UserDoc.provider());
  },

  snsId() {
    return applyDecorators(UserDoc.snsId());
  },
};
