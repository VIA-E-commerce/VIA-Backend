import { SwaggerDoc } from '@/common';
import { ReviewDoc } from '@/docs';

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
