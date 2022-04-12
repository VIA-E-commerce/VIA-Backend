import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, Min } from 'class-validator';

import { getIsIntMessage, getMinMessage, SWAGGER } from '@/common';

import { COMMON } from '../constants';

export const CommonValidation = {
  id() {
    return applyDecorators(
      Type(() => Number),
      IsNumber({}, { message: SWAGGER.ID.IS_NUMBER_MESSAGE }),
    );
  },

  order() {
    const property = COMMON.ORDER.KR;
    return applyDecorators(
      IsInt({ message: getIsIntMessage({ property }) }),
      Min(COMMON.ORDER.MIN, {
        message: getMinMessage({ property, min: COMMON.ORDER.MIN }),
      }),
    );
  },
};
