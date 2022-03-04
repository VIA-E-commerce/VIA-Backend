import { CartDoc } from '@/module/cart/dto';
import { ProductDoc, VariantOptionResponse } from '@/module/product';
import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from '../entity';

export class CartItemResponse {
  @ApiProperty({
    description: '상품 식별자',
    example: 1,
  })
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
