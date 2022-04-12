import { applyDecorators } from '@nestjs/common';

import { SwaggerDoc } from '@/common';

export const CartItemDoc = {
  cartItemId() {
    return applyDecorators(SwaggerDoc.id('장바구니 아이템 식별자'));
  },
};
