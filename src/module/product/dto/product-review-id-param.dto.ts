import { SwaggerDoc } from '@/common';

import { ProductIdParam } from './product-id-param.dto';

export class ProductReviewIdParam extends ProductIdParam {
  @SwaggerDoc.id('상품 리뷰 식별자')
  reviewId: number;
}
