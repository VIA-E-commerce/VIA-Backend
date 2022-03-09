import { SwaggerDoc } from '@/common';

export class ProductIdParam {
  @SwaggerDoc.id('상품 식별자')
  productId: number;
}

export class ProductReviewIdParam extends ProductIdParam {
  @SwaggerDoc.id('상품 리뷰 식별자')
  reviewId: number;
}
