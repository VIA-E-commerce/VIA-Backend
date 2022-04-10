import { ProductDoc } from '@/docs';
import { Question, User } from '@/models';

import { QuestionResponse } from './question-response.dto';

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
