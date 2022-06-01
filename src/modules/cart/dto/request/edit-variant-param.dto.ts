import { VariantRequestDec } from '@/modules/product';

import { CartItemRequestDec } from '../decorator';

export class EditVariantParam {
  @CartItemRequestDec.cartItemId()
  cartItemId: number;

  @VariantRequestDec.variantId()
  variantId: number;
}
