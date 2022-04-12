import { VariantRequestDec } from '@/module/product';

import { CartItemRequestDec } from '../decorator';

export class EditVariantParam {
  @CartItemRequestDec.cartItemId()
  cartItemId: number;

  @VariantRequestDec.variantId()
  variantId: number;
}
