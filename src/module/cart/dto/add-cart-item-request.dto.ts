import { SwaggerDoc } from '@/common';
import { CartDoc } from '@/docs';

export class AddCartItemRequest {
  @SwaggerDoc.id('상품 품목 식별자')
  variantId: number;

  @CartDoc.quantity()
  quantity: number;
}
