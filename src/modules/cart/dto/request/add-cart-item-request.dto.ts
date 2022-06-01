import { VariantRequestDec } from '@/modules/product';

import { CartRequestDec } from '../decorator';

export class AddCartItemRequest {
  @VariantRequestDec.variantId()
  variantId: number;

  @CartRequestDec.quantity()
  quantity: number;
}
