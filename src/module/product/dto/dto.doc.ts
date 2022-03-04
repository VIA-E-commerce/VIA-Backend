import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const ProductDoc = {
  name() {
    return applyDecorators(
      ApiProperty({
        description: '상품명',
        example: '남녀공용 기모 오버핏 무지 맨투맨',
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
};

export const CategoryDoc = {
  name() {
    return applyDecorators(
      ApiProperty({
        description: '상품 그룹명',
        example: 'OUTER',
      }),
    );
  },

  code() {
    return applyDecorators(
      ApiProperty({
        description: '상품 그룹 코드',
        example: 'outer',
      }),
    );
  },
};

export const OptionDoc = {
  label() {
    return applyDecorators(
      ApiProperty({
        description: '고객에게 노출될 옵션 라벨',
        example: '사이즈',
      }),
    );
  },

  description() {
    return applyDecorators(
      ApiProperty({
        description: '관리자에게 노출될 옵션 설명',
        example: '옷 사이즈 (XS/S/M/L/XL)',
      }),
    );
  },

  inputType() {
    return applyDecorators(
      ApiPropertyOptional({
        description: '옵션 Input 종류',
        example: 'CHECKBOX',
      }),
    );
  },

  order() {
    return applyDecorators(
      ApiProperty({
        description: '정렬 순서 (0부터 시작)',
        example: 0,
      }),
    );
  },
};

export const OptionValueDoc = {
  value() {
    return applyDecorators(
      ApiProperty({
        description: '옵션값 이름',
        example: 'XL',
      }),
    );
  },

  additionalCharge() {
    return applyDecorators(
      ApiPropertyOptional({
        description: '품목 옵션 추가 금액',
        example: 5000,
      }),
    );
  },

  order() {
    return applyDecorators(
      ApiProperty({
        description: '정렬 순서 (0부터 시작)',
        example: 0,
      }),
    );
  },
};

export const VariantDoc = {
  quantity() {
    return applyDecorators(
      ApiProperty({
        description: '재고 수량',
        example: 100,
      }),
    );
  },

  hide() {
    return applyDecorators(
      ApiPropertyOptional({
        description: '품목 표시 여부',
        example: false,
      }),
    );
  },
};
