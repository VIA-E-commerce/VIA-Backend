import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';
import { ProductDoc, VariantOptionResponse } from '@/module/product';

import { CartItem } from '../entity';
import { CartDoc } from './dto.doc';

export class CartItemResponse {
  @SwaggerDoc.id('상품 식별자')
  productId: number;

  @ProductDoc.name()
  productName: string;

  @ProductDoc.retailPrice()
  retailPrice: number;

  @ProductDoc.sellingPrice()
  sellingPrice: number;

  @CartDoc.quantity()
  quantity: number;

  @ApiProperty({
    description: '구매 불가 상태',
    example: false,
  })
  disabled: boolean;

  @ApiProperty({
    description: '상품 옵션',
  })
  variantOptions: VariantOptionResponse[];

  constructor(cartItem: CartItem) {
    const variant = cartItem.variant;
    const product = variant.product;

    this.productId = product.id;
    this.productName = product.name;
    this.retailPrice = product.retailPrice;
    this.sellingPrice = product.sellingPrice;

    this.quantity = cartItem.quantity;
    this.disabled = variant.hide || !product.onSale;

    this.variantOptions = variant.optionValues.map(
      (optionValue) => new VariantOptionResponse(optionValue),
    );
  }
}
