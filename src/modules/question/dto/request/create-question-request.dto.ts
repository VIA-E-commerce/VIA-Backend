import { IsOptional } from 'class-validator';

import { ProductRequestDec } from '@/modules/product';

import { QuestionRequestDec } from '../decorator';

export class CreateQuestionRequest {
  @QuestionRequestDec.title()
  title: string;

  @QuestionRequestDec.content()
  content: string;

  @QuestionRequestDec.isPrivate()
  @IsOptional()
  isPrivate: boolean;

  @ProductRequestDec.productId()
  productId: number;
}
