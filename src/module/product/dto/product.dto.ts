import { SwaggerDoc } from '@/common';
import { Color, ColorResponse } from '@/module/color';
import { SizeValue, SizeValueResponse } from '@/module/size';

import { Product } from '../entity';
import { ProductDoc } from './dto.doc';
import { CategoryResponse } from './category.dto';

export class ProductCardResponse {
  @SwaggerDoc.id('상품 식별자')
  id: number;

  @ProductDoc.name()
  name: string;

  @ProductDoc.retailPrice()
  retailPrice: number;

  @ProductDoc.sellingPrice()
  sellingPrice: number;

  @ProductDoc.salesVolume()
  salesVolume: number;

  @ProductDoc.reviewCount()
  reviewCount: number;

  @ProductDoc.wishCount()
  wishCount: number;

  @ProductDoc.display()
  display: boolean;

  @ProductDoc.onSale()
  onSale: boolean;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;

  category: CategoryResponse;

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

    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;

    this.category = new CategoryResponse(product.category);
  }
}

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
