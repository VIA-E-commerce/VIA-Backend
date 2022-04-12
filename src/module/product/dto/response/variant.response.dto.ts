import { Variant } from '@/models';
import { ColorResponseDec } from '@/module/color';
import { SizeValueResponseDec } from '@/module/size';

import { VariantResponseDec } from '../decorator';

export class VariantResponse {
  @VariantResponseDec.variantId()
  id: number;

  @VariantResponseDec.quantity()
  quantity: number;

  @ColorResponseDec.colorId()
  colorId: number;

  @SizeValueResponseDec.sizeValueId()
  sizeId: number;

  constructor(variant: Variant) {
    this.id = variant.id;
    this.quantity = variant.quantity;
    this.colorId = variant.colorId;
    this.sizeId = variant.sizeValueId;
  }
}
