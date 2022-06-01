import { IsOptional } from 'class-validator';

// 모듈 순환 참조 오류 때문에 깊은 경로에서 import
import { ProductRequestDec } from '@/modules/product/dto/decorator';

import { ReviewRequestDec } from '../decorator';

export class CreateReviewRequest {
  @ReviewRequestDec.content()
  content: string;

  @ReviewRequestDec.imageUrl()
  @IsOptional()
  imageUrl: string;

  @ReviewRequestDec.rating()
  rating: number;

  @ProductRequestDec.productId()
  productId: number;
}
