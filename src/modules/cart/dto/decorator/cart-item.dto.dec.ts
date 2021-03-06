import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray } from 'class-validator';

import { SwaggerValidation } from '@/common';
import { CartItemDoc } from '@/docs';
import { ColorResponse } from '@/modules/color';
import { SizeValueResponse } from '@/modules/size';

export const CartItemRequestDec = {
  cartItemId() {
    return applyDecorators(CartItemDoc.cartItemId(), SwaggerValidation.id());
  },

  cartItemIds(options?: { required?: boolean }) {
    return applyDecorators(
      ApiProperty({
        isArray: true,
        description: '장바구니 아이템 식별자 목록',
        example: [1, 2],
        required: options?.required || false,
      }),
      Type(() => Number),
      Transform(({ value }) => (value.length ? value : [value])),
      IsArray({
        message: '장바구니 아이템 식별자 목록은 배열 타입이어야 합니다.',
      }),
    );
  },
};

export const CartItemResponseDec = {
  cartItemId() {
    return applyDecorators(CartItemDoc.cartItemId());
  },

  stock() {
    return applyDecorators(
      ApiProperty({
        description: '재고 수량',
        example: 10,
      }),
    );
  },

  disabled() {
    return applyDecorators(
      ApiProperty({
        description: '구매 불가 상태',
        example: false,
      }),
    );
  },

  color() {
    return applyDecorators(
      ApiProperty({
        description: '색상 옵션',
        type: ColorResponse,
      }),
    );
  },

  size() {
    return applyDecorators(
      ApiProperty({
        description: '사이즈 옵션',
        type: SizeValueResponse,
      }),
    );
  },

  addCartItemMessage() {
    return applyDecorators(
      ApiProperty({
        description: '장바구니 아이템 추가 메시지',
      }),
    );
  },
};
