import { QuestionDoc } from '@/docs';

export class EditQuestionRequest {
  @QuestionDoc.title()
  title: string;

  @QuestionDoc.content()
  content: string;

  @QuestionDoc.isPrivate()
  isPrivate: boolean;
}
