import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';
import { ProductDoc } from '@/docs';
import { Color, Product, SizeValue } from '@/models';
import { ColorResponse } from '@/module/color';
import { SizeValueResponse } from '@/module/size';

import { VariantResponse } from './variant.response.dto';

export class ProductDetailResponse {
  @SwaggerDoc.id('상품 식별자')
  id: number;

  @ProductDoc.name()
  name: string;

  @ProductDoc.images()
  images: string[];

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

  @ProductDoc.wished()
  wished: boolean;

  @ApiProperty({
    description: '상품 품목 목록',
    type: [VariantResponse],
  })
  variants: VariantResponse[];

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

  constructor(
    product: Product,
    colors: Color[],
    sizeValues: SizeValue[],
    wished: boolean,
  ) {
    this.id = product.id;
    this.name = product.name;
    this.images = product.images.map((image) => image.url);

    this.retailPrice = product.retailPrice;
    this.sellingPrice = product.sellingPrice;

    this.salesVolume = product.salesVolume;
    this.reviewCount = product.reviewCount;
    this.wishCount = product.wishCount;

    this.display = product.display;
    this.onSale = product.onSale;
    this.wished = wished;

    this.variants = product.variants.map(
      (variant) => new VariantResponse(variant),
    );
    this.colors = colors.map((color) => new ColorResponse(color));
    this.sizes = sizeValues.map(
      (sizeValue) => new SizeValueResponse(sizeValue),
    );
  }
}
