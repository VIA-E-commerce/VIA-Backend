import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';

export const ProductDoc = {
  productId() {
    return applyDecorators(SwaggerDoc.id('상품 식별자'));
  },

  name() {
    return applyDecorators(
      ApiProperty({
        description: '상품명',
        example: '남녀공용 기모 오버핏 무지 맨투맨',
      }),
    );
  },

  description() {
    return applyDecorators(
      ApiProperty({
        description: '상품 설명',
      }),
    );
  },

  thumbnail() {
    return applyDecorators(
      ApiProperty({
        description: '상품 썸네일',
        example:
          'https://s3.ap-northeast-2.amazonaws.com/img.stibee.com/43159_1633018317.jpeg',
      }),
    );
  },

  retailPrice() {
    return applyDecorators(
      ApiPropertyOptional({
        description: '소비자가',
        example: 39900,
      }),
    );
  },

  sellingPrice() {
    return applyDecorators(
      ApiProperty({
        description: '판매가',
        example: 19900,
      }),
    );
  },

  // 통계 속성
  salesVolume() {
    return applyDecorators(
      ApiPropertyOptional({
        description: '판매량',
        example: 2761,
      }),
    );
  },

  reviewCount() {
    return applyDecorators(
      ApiPropertyOptional({
        description: '리뷰 수',
        example: 137,
      }),
    );
  },

  wishCount() {
    return applyDecorators(
      ApiPropertyOptional({
        description: '찜 수',
        example: 12,
      }),
    );
  },

  // check 옵션
  display() {
    return applyDecorators(
      ApiPropertyOptional({
        description: '진열 여부',
        example: true,
      }),
    );
  },

  onSale() {
    return applyDecorators(
      ApiPropertyOptional({
        description: '판매 여부',
        example: true,
      }),
    );
  },

  wished() {
    return applyDecorators(
      ApiProperty({
        description: '위시리스트 추가 여부',
        example: true,
      }),
    );
  },
};
