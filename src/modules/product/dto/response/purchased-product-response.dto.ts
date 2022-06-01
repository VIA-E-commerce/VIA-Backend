import { Product } from '@/models';

import { ProductResponseDec } from '../decorator';

export class PurchasedProductResponse {
  @ProductResponseDec.productId()
  id: number;

  @ProductResponseDec.name()
  name: string;

  @ProductResponseDec.thumbnail()
  thumbnail: string;

  @ProductResponseDec.display()
  display: boolean;

  @ProductResponseDec.onSale()
  onSale: boolean;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    if (product.images.length > 0) {
      this.thumbnail = product.images[0].url;
    }

    this.display = product.display;
    this.onSale = product.onSale;
  }
}
