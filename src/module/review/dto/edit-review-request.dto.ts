import { ReviewDoc } from '@/docs';

export class EditReviewRequest {
  @ReviewDoc.content()
  content: string;

  @ReviewDoc.imageUrl()
  imageUrl: string;

  @ReviewDoc.rating()
  rating: number;
}
