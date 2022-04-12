import { applyDecorators } from '@nestjs/common';
import { IsInt, IsPositive, Max } from 'class-validator';

import { getMaxMessage, SwaggerEntityDoc } from '@/common';

import { CART_ITEM } from '../../constants';
import { CartItem } from '../../entities';

export const CartItemValidation: SwaggerEntityDoc<CartItem> = {
  quantity() {
    const property = CART_ITEM.QUANTITY.KR;
    return applyDecorators(
      IsInt(),
      IsPositive(),
      Max(CART_ITEM.QUANTITY.MAX, {
        message: getMaxMessage({ property, max: CART_ITEM.QUANTITY.MAX }),
      }),
    );
  },
};
