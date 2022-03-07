import { SwaggerDoc } from '@/common';

import { CartDoc } from './dto.doc';

export class AddCartItemRequest {
  @SwaggerDoc.id('상품 식별자')
  productId: number;

  @SwaggerDoc.id('상품 품목 식별자')
  variantId: number;

  @CartDoc.quantity()
  quantity: number;
}