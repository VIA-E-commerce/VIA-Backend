import { Color, ColorResponse } from '@/module/color';
import { SizeValue, SizeValueResponse } from '@/module/size';

import { Product } from '../entity';

export class ProductDetailResponse {
  id: number;

  name: string;

  retailPrice: number;
  sellingPrice: number;

  salesVolume: number;
  reviewCount: number;
  wishCount: number;

  display: boolean;
  onSale: boolean;

  colors: ColorResponse[];
  sizes: SizeValueResponse[];

  constructor(product: Product, colors: Color[], sizeValues: SizeValue[]) {
    this.id = product.id;
    this.name = product.name;
    this.retailPrice = product.retailPrice;
    this.sellingPrice = product.sellingPrice;
    this.salesVolume = product.salesVolume;
    this.reviewCount = product.reviewCount;
    this.wishCount = product.wishCount;
    this.display = product.display;
    this.onSale = product.onSale;

    this.colors = colors.map((color) => new ColorResponse(color));
    this.sizes = sizeValues.map(
      (sizeValue) => new SizeValueResponse(sizeValue),
    );
  }
}
