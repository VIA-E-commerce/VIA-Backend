import { applyDecorators } from '@nestjs/common';
import { IsString, MaxLength } from 'class-validator';

import {
  getIsStringMessage,
  getMaxLengthMessage,
  SwaggerEntityDoc,
} from '@/common';

import { SIZE_GROUP } from '../../constants';
import { SizeGroup } from '../../entities';

export const SizeGroupValidation: SwaggerEntityDoc<SizeGroup> = {
  label() {
    const property = SIZE_GROUP.LABEL.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
      MaxLength(SIZE_GROUP.LABEL.MAX_LENGTH, {
        message: getMaxLengthMessage({
          property,
          maxLength: SIZE_GROUP.LABEL.MAX_LENGTH,
        }),
      }),
    );
  },
};
