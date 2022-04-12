import { ReviewRequestDec } from '../decorator';

export class ReviewIdParam {
  @ReviewRequestDec.reviewId()
  id: number;
}
