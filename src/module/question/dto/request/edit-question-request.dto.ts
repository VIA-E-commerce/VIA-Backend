import { IsOptional } from 'class-validator';

import { QuestionRequestDec } from '../decorator';

export class EditQuestionRequest {
  @QuestionRequestDec.title()
  @IsOptional()
  title: string;

  @QuestionRequestDec.content()
  @IsOptional()
  content: string;

  @QuestionRequestDec.isPrivate()
  @IsOptional()
  isPrivate: boolean;
}
