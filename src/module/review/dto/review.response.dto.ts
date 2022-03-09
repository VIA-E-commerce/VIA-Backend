import { SwaggerDoc } from '@/common';
import { ApiProperty } from '@nestjs/swagger';

import { Review } from '../entity';
import { ReviewDoc } from './review.dto.doc';

export class ReviewResponse {
  @SwaggerDoc.id('리뷰 식별자')
  id: number;

  @ReviewDoc.content()
  content: string;

  @ReviewDoc.imageUrl()
  imageUrl: string;

  @ReviewDoc.rating()
  rating: number;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;

  @SwaggerDoc.id('작성자 식별자')
  authorId: number;

  @ApiProperty({
    description: '작성자 이름',
    example: '홍**',
  })
  author: string;

  constructor(review: Review) {
    this.id = review.id;
    this.content = review.content;
    this.imageUrl = review.imageUrl;
    this.rating = review.rating;
    this.createdAt = review.createdAt;
    this.updatedAt = review.updatedAt;
    this.authorId = review.user.id;
    this.author = `${review.user.name.charAt(0)}**`;
  }
}
