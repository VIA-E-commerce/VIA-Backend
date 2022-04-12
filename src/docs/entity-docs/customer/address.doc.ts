import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';

export const AddressDoc = {
  addressId() {
    return applyDecorators(SwaggerDoc.id('주소 식별자'));
  },

  label() {
    return applyDecorators(
      ApiProperty({
        description: '주소 식별 라벨',
        example: '집',
      }),
    );
  },

  recipient() {
    return applyDecorators(
      ApiProperty({
        description: '수령인',
        example: '홍길동',
      }),
    );
  },

  recipientPhone() {
    return applyDecorators(
      ApiProperty({
        description: '수령인 연락처',
        example: '01012345678',
      }),
    );
  },

  postalCode() {
    return applyDecorators(
      ApiProperty({
        description: '우편 번호',
        example: '12345',
      }),
    );
  },

  address() {
    return applyDecorators(
      ApiProperty({
        description: '기본 주소',
        example: '서울특별시 종로구 세종대로 209',
      }),
    );
  },

  addressDetail() {
    return applyDecorators(
      ApiProperty({
        description: '상세 주소',
        example: '1403호(세종로)',
      }),
    );
  },

  isDefault() {
    return applyDecorators(
      ApiProperty({
        description: '기본 주소지 여부',
        example: true,
      }),
    );
  },

  usedAt() {
    return applyDecorators(
      ApiProperty({
        description: '마지막 사용일',
        example: '2022-01-01 00:00:00',
      }),
    );
  },
};
