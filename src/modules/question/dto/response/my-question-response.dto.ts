import { Question, User } from '@/models';
import { ProductResponseDec } from '@/modules/product';

import { QuestionResponse } from './question-response.dto';

export class MyQuestionResponse extends QuestionResponse {
  @ProductResponseDec.thumbnail()
  thumbnail: string;

  constructor(question: Question, user?: User) {
    super(question, user);

    if (question.product.images.length > 0) {
      this.thumbnail = question.product.images[0].url;
    }
  }
}
