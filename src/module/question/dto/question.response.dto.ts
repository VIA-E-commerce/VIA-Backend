import { ApiProperty } from '@nestjs/swagger';

import { maskUsername, SwaggerDoc } from '@/common';
import { ProductDoc, QuestionDoc } from '@/docs';
import { Question, User } from '@/models';

export class QuestionResponse {
  @SwaggerDoc.id('문의 식별자')
  id: number;

  @QuestionDoc.title()
  title: string;

  @QuestionDoc.content()
  content: string;

  @SwaggerDoc.id('작성자 식별자')
  userId: number;

  @ApiProperty({
    description: '작성자 이름',
    example: '홍**',
  })
  username: string;

  @QuestionDoc.isPrivate()
  isPrivate: boolean;

  @SwaggerDoc.id('상품 식별자')
  productId: number;

  @ProductDoc.name()
  productName: string;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;

  constructor(question: Question, user?: User) {
    this.id = question.id;

    this.title = question.title;

    this.userId = question.user.id;
    this.username = maskUsername(question.user.name);

    this.isPrivate = question.isPrivate;

    // 비밀글 처리
    if (!this.isPrivate || (user && user.id === this.userId)) {
      this.content = question.content;
    }

    this.productId = question.product.id;
    this.productName = question.product.name;

    this.createdAt = question.createdAt;
    this.updatedAt = question.updatedAt;
  }
}

export class MyQuestionResponse extends QuestionResponse {
  @ProductDoc.thumbnail()
  thumbnail: string;

  constructor(question: Question, user?: User) {
    super(question, user);

    if (question.product.images.length > 0) {
      this.thumbnail = question.product.images[0].url;
    }
  }
}
