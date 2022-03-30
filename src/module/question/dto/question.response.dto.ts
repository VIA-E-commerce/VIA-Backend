import { ApiProperty } from '@nestjs/swagger';

import { maskUsername, SwaggerDoc } from '@/common';
import { User } from '@/module/user';

import { Question } from '../entity';
import { QuestionDoc } from './question.dto.doc';

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

    this.productId = question.productId;

    this.createdAt = question.createdAt;
    this.updatedAt = question.updatedAt;
  }
}
