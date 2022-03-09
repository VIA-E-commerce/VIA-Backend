import { SwaggerDoc } from '@/common';

import { ReviewDoc } from './review.dto.doc';

export class CreateReviewRequest {
  @ReviewDoc.content()
  content: string;

  @ReviewDoc.imageUrl()
  imageUrl: string;

  @ReviewDoc.rating()
  rating: number;

  @SwaggerDoc.id('상품 식별자')
  productId: number;
}

export class EditReviewRequest {
  @ReviewDoc.content()
  content: string;

  @ReviewDoc.imageUrl()
  imageUrl: string;

  @ReviewDoc.rating()
  rating: number;
}
