import { maskUsername, SwaggerDoc } from '@/common';
import { Review } from '@/models';

import { ReviewResponseDec } from '../decorator';

export class ReviewResponse {
  @ReviewResponseDec.reviewId()
  id: number;

  @ReviewResponseDec.content()
  content: string;

  @ReviewResponseDec.imageUrl()
  imageUrl: string;

  @ReviewResponseDec.rating()
  rating: number;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;

  @ReviewResponseDec.authorId()
  authorId: number;

  @ReviewResponseDec.author()
  author: string;

  constructor(review: Review) {
    this.id = review.id;
    this.content = review.content;
    this.imageUrl = review.imageUrl;
    this.rating = review.rating;
    this.createdAt = review.createdAt;
    this.updatedAt = review.updatedAt;
    this.authorId = review.user.id;
    this.author = maskUsername(review.user.name);
  }
}
