import { ApiProperty } from '@nestjs/swagger';

import { Color, Product, SizeValue } from '@/models';
import { ColorResponse } from '@/module/color';
import { SizeValueResponse } from '@/module/size';

import { ProductResponseDec } from '../decorator';

import { VariantResponse } from './variant.response.dto';

export class ProductDetailResponse {
  @ProductResponseDec.productId()
  id: number;

  @ProductResponseDec.name()
  name: string;

  @ProductResponseDec.description()
  description: string;

  @ProductResponseDec.images()
  images: string[];

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
  wished: boolean;

  @ProductResponseDec.isSoldOut()
  isSoldOut: boolean;

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
    isSoldOut: boolean,
  ) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.images = product.images.map((image) => image.url);

    this.retailPrice = product.retailPrice;
    this.sellingPrice = product.sellingPrice;

    this.salesVolume = product.salesVolume;
    this.reviewCount = product.reviewCount;
    this.wishCount = product.wishCount;

    this.display = product.display;
    this.onSale = product.onSale;
    this.wished = wished;
    this.isSoldOut = isSoldOut;

    this.variants = product.variants.map(
      (variant) => new VariantResponse(variant),
    );
    this.colors = colors.map((color) => new ColorResponse(color));
    this.sizes = sizeValues.map(
      (sizeValue) => new SizeValueResponse(sizeValue),
    );
  }
}
