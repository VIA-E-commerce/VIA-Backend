import { SwaggerDoc } from '@/common';

import { QuestionDoc } from './question.dto.doc';

export class CreateQuestionRequest {
  @QuestionDoc.title()
  title: string;

  @QuestionDoc.content()
  content: string;

  @QuestionDoc.isPrivate()
  isPrivate: boolean;

  @SwaggerDoc.id('상품 식별자')
  productId: number;
}
