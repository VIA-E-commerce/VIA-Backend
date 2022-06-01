import { Review } from '@/models';
import { ProductResponseDec } from '@/modules/product/dto/decorator';

import { ReviewResponse } from './review-response.dto';

export class MyReviewResponse extends ReviewResponse {
  @ProductResponseDec.productId()
  productId: number;

  @ProductResponseDec.name()
  productName: string;

  @ProductResponseDec.thumbnail()
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
