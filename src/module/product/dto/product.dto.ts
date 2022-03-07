import { SwaggerDoc } from '@/common';
import { Color, ColorResponse } from '@/module/color';
import { SizeValue, SizeValueResponse } from '@/module/size';

import { Product } from '../entity';
import { ProductDoc } from './dto.doc';
import { CategoryResponse } from './category.dto';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({
    description: '상품 카테고리',
    type: CategoryResponse,
  })
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

  @ApiProperty({
    description: '상품 색상 목록',
    type: [ColorResponse],
  })
  colors: ColorResponse[];

  @ApiProperty({
    description: '상품 사이즈 목록',
    type: [SizeValueResponse],
  })
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
