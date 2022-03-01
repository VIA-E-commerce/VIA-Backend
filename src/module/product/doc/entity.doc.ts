import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const ProductDoc = {
  name() {
    return applyDecorators(
      ApiProperty({
        description: '상품명',
        example: '남녀공용 기모 오버핏 무지 맨투맨',
        required: true,
      }),
    );
  },

  retailPrice() {
    return applyDecorators(
      ApiProperty({
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
        required: true,
      }),
    );
  },

  // 통계 속성
  salesVolume() {
    return applyDecorators(
      ApiProperty({
        description: '판매량',
        example: 2761,
      }),
    );
  },

  reviewCount() {
    return applyDecorators(
      ApiProperty({
        description: '리뷰 수',
        example: 137,
      }),
    );
  },

  wishCount() {
    return applyDecorators(
      ApiProperty({
        description: '찜 수',
        example: 12,
      }),
    );
  },

  // check 옵션
  display() {
    return applyDecorators(
      ApiProperty({
        description: '진열 여부',
        example: true,
      }),
    );
  },

  onSale() {
    return applyDecorators(
      ApiProperty({
        description: '판매 여부',
        example: true,
      }),
    );
  },
};

export const ProductGroupDoc = {
  name() {
    return applyDecorators(
      ApiProperty({
        description: '상품 그룹명',
        example: 'OUTER',
        required: true,
      }),
    );
  },

  code() {
    return applyDecorators(
      ApiProperty({
        description: '상품 그룹 코드',
        example: 'outer',
        required: true,
      }),
    );
  },
};
