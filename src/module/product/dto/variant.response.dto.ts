import { SwaggerDoc } from '@/common';
import { VariantDoc } from '@/docs';
import { Variant } from '@/models';

export class VariantResponse {
  @SwaggerDoc.id('상품 품목 식별자')
  id: number;

  @VariantDoc.quantity()
  quantity: number;

  @SwaggerDoc.id('색상 식별자')
  colorId: number;

  @SwaggerDoc.id('사이즈 값 식별자')
  sizeId: number;

  constructor(variant: Variant) {
    this.id = variant.id;
    this.quantity = variant.quantity;
    this.colorId = variant.colorId;
    this.sizeId = variant.sizeValueId;
  }
}
