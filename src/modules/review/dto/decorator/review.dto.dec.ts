import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, ValidateIf } from 'class-validator';

import { SwaggerDoc, SwaggerValidation } from '@/common';
import { ReviewDoc } from '@/docs';
import { ReviewValidation } from '@/models';

import { ReviewSort } from '../../enum';
import { REVIEW_DTO } from '../review.dto.constant';

export const ReviewRequestDec = {
  reviewId() {
    return applyDecorators(ReviewDoc.reviewId(), SwaggerValidation.id());
  },

  content() {
    return applyDecorators(ReviewDoc.content(), ReviewValidation.content());
  },

  imageUrl() {
    return applyDecorators(ReviewDoc.imageUrl(), ReviewValidation.imageUrl());
  },

  rating() {
    return applyDecorators(ReviewDoc.rating(), ReviewValidation.rating());
  },

  sort() {
    return applyDecorators(
      ApiPropertyOptional({
        description: REVIEW_DTO.SORT.KR,
        example: ReviewSort.RATING_DESC,
      }),
      ValidateIf((value) => value === ''),
      IsEnum(ReviewSort, {
        message: `지원하지 않는 ${REVIEW_DTO.SORT.KR}입니다.`,
      }),
    );
  },
};

export const ReviewResponseDec = {
  reviewId() {
    return applyDecorators(ReviewDoc.reviewId());
  },

  content() {
    return applyDecorators(ReviewDoc.content());
  },

  imageUrl() {
    return applyDecorators(ReviewDoc.imageUrl());
  },

  rating() {
    return applyDecorators(ReviewDoc.rating());
  },

  authorId() {
    return applyDecorators(SwaggerDoc.id('작성자 식별자'));
  },

  author() {
    return applyDecorators(
      ApiProperty({
        description: '작성자 이름',
        example: '홍**',
      }),
    );
  },
};
