import {
  getIsBooleanMessage,
  getIsStringMessage,
  getMaxLengthMessage,
  SwaggerEntityDoc,
} from '@/common';
import { QUESTION } from '@/models/constants';
import { applyDecorators } from '@nestjs/common';
import { IsBoolean, IsString, MaxLength } from 'class-validator';

import { Question } from '../entities';

export const QuestionValidation: SwaggerEntityDoc<Question> = {
  title() {
    const property = QUESTION.TITLE.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
      MaxLength(QUESTION.TITLE.MAX_LENGTH, {
        message: getMaxLengthMessage({
          property,
          maxLength: QUESTION.TITLE.MAX_LENGTH,
        }),
      }),
    );
  },

  content() {
    const property = QUESTION.CONTENT.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
    );
  },

  isPrivate() {
    const property = QUESTION.IS_PRIVATE.KR;
    return applyDecorators(
      IsBoolean({ message: getIsBooleanMessage({ property }) }),
    );
  },
};
