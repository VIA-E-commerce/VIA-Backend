import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const ReviewDoc = {
  content() {
    return applyDecorators(
      ApiProperty({
        description: '리뷰 내용',
        example: '새 옷 냄새도 많이 나지 않고 딱 제 취향이라 너무 만족스러워요',
      }),
    );
  },

  imageUrl() {
    return applyDecorators(
      ApiProperty({
        description: '이미지 경로',
        example:
          'https://s3.ap-northeast-2.amazonaws.com/img.stibee.com/43159_1633018317.jpeg',
      }),
    );
  },

  rating() {
    return applyDecorators(
      ApiProperty({
        description: '상품 평점',
        example: 10,
      }),
    );
  },
};
