import { SwaggerDoc } from '@/common';

export class ProductIdParam {
  @SwaggerDoc.id('상품 식별자')
  productId: number;
}
