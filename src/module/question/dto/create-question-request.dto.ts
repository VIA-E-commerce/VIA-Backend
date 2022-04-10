import { SwaggerDoc } from '@/common';
import { QuestionDoc } from '@/docs';

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
