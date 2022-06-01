import { QuestionRequestDec } from '../decorator';

export class QuestionIdParam {
  @QuestionRequestDec.questionId()
  id: number;
}
