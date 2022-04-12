import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

import { SWAGGER } from './swagger.const';

export const SwaggerValidation = {
  id() {
    return applyDecorators(
      Type(() => Number),
      IsNumber({}, { message: SWAGGER.ID.IS_NUMBER_MESSAGE }),
    );
  },
};
