import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';
import { Product } from '@/models';

import { ProductResponseDec } from '../decorator';

import { CategoryResponse } from './category-response.dto';

export class ProductCardResponse {
  @ProductResponseDec.productId()
  id: number;

  @ProductResponseDec.name()
  name: string;

  @ProductResponseDec.thumbnail()
  thumbnail: string;

  @ProductResponseDec.retailPrice()
  retailPrice: number;

  @ProductResponseDec.sellingPrice()
  sellingPrice: number;

  @ProductResponseDec.salesVolume()
  salesVolume: number;

  @ProductResponseDec.reviewCount()
  reviewCount: number;

  @ProductResponseDec.wishCount()
  wishCount: number;

  @ProductResponseDec.display()
  display: boolean;

  @ProductResponseDec.onSale()
  onSale: boolean;

  @ProductResponseDec.wished()
  wished = false;

  @ProductResponseDec.isSoldOut()
  isSoldOut = false;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;

  @ApiProperty({
    description: '상품 카테고리',
    type: CategoryResponse,
  })
  category: CategoryResponse;

  constructor(product: Product, wished?: boolean, isSoldOut?: boolean) {
    this.id = product.id;
    this.name = product.name;
    if (product.images.length > 0) {
      this.thumbnail = product.images[0].url;
    }

    this.retailPrice = product.retailPrice;
    this.sellingPrice = product.sellingPrice;

    this.salesVolume = product.salesVolume;
    this.reviewCount = product.reviewCount;
    this.wishCount = product.wishCount;

    this.display = product.display;
    this.onSale = product.onSale;
    this.wished = wished;
    this.isSoldOut = isSoldOut;

    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;

    if (product.category) {
      this.category = new CategoryResponse(product.category);
    }
  }
}
