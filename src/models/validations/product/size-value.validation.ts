import { applyDecorators } from '@nestjs/common';
import { IsString, MaxLength } from 'class-validator';

import {
  getIsStringMessage,
  getMaxLengthMessage,
  SwaggerEntityDoc,
} from '@/common';

import { SIZE_VALUE } from '../../constants';
import { SizeValue } from '../../entities';
import { CommonValidation } from '../common.validation';

export const SizeValueValidation: SwaggerEntityDoc<SizeValue> = {
  label() {
    const property = SIZE_VALUE.LABEL.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
      MaxLength(SIZE_VALUE.LABEL.MAX_LENGTH, {
        message: getMaxLengthMessage({
          property,
          maxLength: SIZE_VALUE.LABEL.MAX_LENGTH,
        }),
      }),
    );
  },

  order() {
    return CommonValidation.order();
  },
};
