import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';
import { ColorResponse } from '@/module/color';
import { ProductDoc } from '@/module/product';
import { SizeValueResponse } from '@/module/size';

import { CartDoc } from './dto.doc';
import { CartItem } from '../entity';

export class CartItemResponse {
  @SwaggerDoc.id('장바구니 아이템 식별자')
  id: number;

  @SwaggerDoc.id('상품 식별자')
  productId: number;

  @SwaggerDoc.id('상품 품목 식별자')
  variantId: number;

  @ProductDoc.name()
  productName: string;

  @ProductDoc.retailPrice()
  retailPrice: number;

  @ProductDoc.sellingPrice()
  sellingPrice: number;

  @CartDoc.quantity()
  quantity: number;

  @ApiProperty({
    description: '재고 수량',
    example: 10,
  })
  stock: number;

  @ApiProperty({
    description: '구매 불가 상태',
    example: false,
  })
  disabled: boolean;

  @ApiProperty({
    description: '색상 옵션',
    type: ColorResponse,
  })
  color: ColorResponse;

  @ApiProperty({
    description: '사이즈 옵션',
    type: SizeValueResponse,
  })
  size: SizeValueResponse;

  constructor(cartItem: CartItem) {
    const variant = cartItem.variant;
    const product = variant.product;

    this.id = cartItem.id;
    this.productId = product.id;
    this.variantId = variant.id;

    this.productName = product.name;
    this.retailPrice = product.retailPrice;
    this.sellingPrice = product.sellingPrice;

    this.quantity = cartItem.quantity;
    this.stock = variant.quantity;
    this.disabled = variant.hide || !product.onSale;

    this.color = new ColorResponse(variant.color);
    this.size = new SizeValueResponse(variant.sizeValue);
  }
}
