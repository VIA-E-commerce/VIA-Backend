import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc, maskUsername } from '@/common';

import { Review } from '../entity';
import { ReviewDoc } from './review.dto.doc';
import { ProductDoc } from '@/module/product';

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
    this.author = maskUsername(review.user.name);
  }
}

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
