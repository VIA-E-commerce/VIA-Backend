import { SwaggerDoc } from '@/common';
import { ProductDoc } from '@/docs';
import { Review } from '@/models';

import { ReviewResponse } from './review-response.dto';

export class MyReviewResponse extends ReviewResponse {
  @SwaggerDoc.id('상품 식별자')
  productId: number;

  @ProductDoc.name()
  productName: string;

  @ProductDoc.thumbnail()
  productThumbnail: string;

  constructor(review: Review) {
    super(review);

    this.productId = review.product.id;
    this.productName = review.product.name;
    if (review.product.images.length > 0) {
      this.productThumbnail = review.product.images[0].url;
    }
  }
}
