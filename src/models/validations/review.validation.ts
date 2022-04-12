import { applyDecorators } from '@nestjs/common';
import { IsInt, IsString, IsUrl, Max, MaxLength, Min } from 'class-validator';

import {
  getIsIntMessage,
  getIsStringMessage,
  getIsUrlMessage,
  getMaxLengthMessage,
  getMaxMessage,
  getMinMessage,
  SwaggerEntityDoc,
} from '@/common';

import { REVIEW } from '../constants';
import { Review } from '../entities';

export const ReviewValidation: SwaggerEntityDoc<Review> = {
  content() {
    const property = REVIEW.CONTENT.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
      MaxLength(REVIEW.CONTENT.MAX_LENGTH, {
        message: getMaxLengthMessage({
          property,
          maxLength: REVIEW.CONTENT.MAX_LENGTH,
        }),
      }),
    );
  },

  imageUrl() {
    const property = REVIEW.IMAGE_URL.KR;
    return applyDecorators(
      IsUrl({}, { message: getIsUrlMessage({ property }) }),
      MaxLength(REVIEW.IMAGE_URL.MAX_LENGTH, {
        message: getMaxLengthMessage({
          property,
          maxLength: REVIEW.IMAGE_URL.MAX_LENGTH,
        }),
      }),
    );
  },

  rating() {
    const property = REVIEW.RATING.KR;
    return applyDecorators(
      IsInt({ message: getIsIntMessage({ property }) }),
      Min(REVIEW.RATING.MIN, {
        message: getMinMessage({ property, min: REVIEW.RATING.MIN }),
      }),
      Max(REVIEW.RATING.MAX, {
        message: getMaxMessage({ property, max: REVIEW.RATING.MAX }),
      }),
    );
  },
};
