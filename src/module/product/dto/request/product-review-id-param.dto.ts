// 모듈 순환 참조 오류 때문에 깊은 경로에서 import
import { ReviewRequestDec } from '@/module/review/dto/decorator';

import { ProductIdParam } from './product-id-param.dto';

export class ProductReviewIdParam extends ProductIdParam {
  @ReviewRequestDec.reviewId()
  reviewId: number;
}
