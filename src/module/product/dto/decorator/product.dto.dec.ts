import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString, ValidateIf } from 'class-validator';

import { getIsStringMessage, SwaggerValidation } from '@/common';
import { ProductDoc } from '@/docs';

import { ProductSort } from '../../enum';
import { PRODUCT_DTO } from '../constant';

export const ProductRequestDec = {
  productId() {
    return applyDecorators(ProductDoc.productId(), SwaggerValidation.id());
  },

  category() {
    return applyDecorators(
      ApiPropertyOptional({
        description: PRODUCT_DTO.CATEGORY.KR,
        example: 'outer',
      }),
      IsString({
        message: getIsStringMessage({ property: PRODUCT_DTO.CATEGORY.KR }),
      }),
    );
  },

  sort() {
    return applyDecorators(
      ApiPropertyOptional({
        description: PRODUCT_DTO.SORT.KR,
        example: ProductSort.PRICE_ASC,
      }),
      ValidateIf((value) => value === ''),
      IsEnum(ProductSort, {
        message: `지원하지 않는 ${PRODUCT_DTO.SORT.KR}입니다.`,
      }),
    );
  },
};

export const ProductResponseDec = {
  productId() {
    return applyDecorators(ProductDoc.productId());
  },

  name() {
    return applyDecorators(ProductDoc.name());
  },

  description() {
    return applyDecorators(ProductDoc.description());
  },

  thumbnail() {
    return applyDecorators(ProductDoc.thumbnail());
  },

  retailPrice() {
    return applyDecorators(ProductDoc.retailPrice());
  },

  sellingPrice() {
    return applyDecorators(ProductDoc.sellingPrice());
  },

  salesVolume() {
    return applyDecorators(ProductDoc.salesVolume());
  },

  reviewCount() {
    return applyDecorators(ProductDoc.reviewCount());
  },

  wishCount() {
    return applyDecorators(ProductDoc.wishCount());
  },

  display() {
    return applyDecorators(ProductDoc.display());
  },

  onSale() {
    return applyDecorators(ProductDoc.onSale());
  },

  wished() {
    return applyDecorators(ProductDoc.wished());
  },

  images() {
    return applyDecorators(
      ApiProperty({
        description: '상품 이미지 목록',
      }),
    );
  },
};
