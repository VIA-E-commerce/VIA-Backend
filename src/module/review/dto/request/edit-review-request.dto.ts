import { IsOptional } from 'class-validator';

import { ReviewRequestDec } from '../decorator';

export class EditReviewRequest {
  @ReviewRequestDec.content()
  @IsOptional()
  content: string;

  @ReviewRequestDec.imageUrl()
  @IsOptional()
  imageUrl: string;

  @ReviewRequestDec.rating()
  @IsOptional()
  rating: number;
}
