import { Product } from '../entity';

export class ProductResponse {
  id: number;

  name: string;

  retailPrice: number;
  sellingPrice: number;

  salesVolume: number;
  reviewCount: number;
  wishCount: number;

  display: boolean;
  onSale: boolean;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.retailPrice = product.retailPrice;
    this.sellingPrice = product.sellingPrice;
    this.salesVolume = product.salesVolume;
    this.reviewCount = product.reviewCount;
    this.wishCount = product.wishCount;
    this.display = product.display;
    this.onSale = product.onSale;
  }
}
