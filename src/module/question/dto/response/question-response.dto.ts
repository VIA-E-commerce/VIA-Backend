import { maskUsername, SwaggerDoc } from '@/common';
import { Question, User } from '@/models';
import { ProductResponseDec } from '@/module/product';
import { UserResponseDec } from '@/module/user';

import { QuestionResponseDec } from '../decorator';

export class QuestionResponse {
  @QuestionResponseDec.questionId()
  id: number;

  @QuestionResponseDec.title()
  title: string;

  @QuestionResponseDec.content()
  content: string;

  @UserResponseDec.userId()
  userId: number;

  @QuestionResponseDec.username()
  username: string;

  @QuestionResponseDec.isPrivate()
  isPrivate: boolean;

  @ProductResponseDec.productId()
  productId: number;

  @ProductResponseDec.name()
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
