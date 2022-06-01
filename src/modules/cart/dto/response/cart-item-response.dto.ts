import { VariantDoc } from '@/docs';
import { CartItem } from '@/models';
import { ColorResponse } from '@/modules/color';
import { ProductResponseDec } from '@/modules/product';
import { SizeValueResponse } from '@/modules/size';

import { CartResponseDec, CartItemResponseDec } from '../decorator';

export class CartItemResponse {
  @CartItemResponseDec.cartItemId()
  id: number;

  @ProductResponseDec.productId()
  productId: number;

  @VariantDoc.variantId()
  variantId: number;

  @ProductResponseDec.name()
  productName: string;

  @ProductResponseDec.thumbnail()
  thumbnail: string;

  @ProductResponseDec.retailPrice()
  retailPrice: number;

  @ProductResponseDec.sellingPrice()
  sellingPrice: number;

  @CartResponseDec.quantity()
  quantity: number;

  @CartItemResponseDec.stock()
  stock: number;

  @CartItemResponseDec.disabled()
  disabled: boolean;

  @CartItemResponseDec.color()
  color: ColorResponse;

  @CartItemResponseDec.size()
  size: SizeValueResponse;

  constructor(cartItem: CartItem) {
    const variant = cartItem.variant;
    const product = variant.product;

    this.id = cartItem.id;
    this.productId = product.id;
    this.variantId = variant.id;

    this.productName = product.name;
    if (product.images.length > 0) {
      this.thumbnail = product.images[0].url;
    }
    this.retailPrice = product.retailPrice;
    this.sellingPrice = product.sellingPrice;

    this.quantity = cartItem.quantity;
    this.stock = variant.quantity;
    this.disabled = variant.hide || !product.onSale;

    this.color = new ColorResponse(variant.color);
    this.size = new SizeValueResponse(variant.sizeValue);
  }
}
