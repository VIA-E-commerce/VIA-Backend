import { IsOptional } from 'class-validator';

import { PagingQuery } from '@/common';

import { ReviewSort } from '../../enum';

import { ReviewRequestDec } from '../decorator';

export class ReviewListQuery extends PagingQuery {
  @ReviewRequestDec.sort()
  @IsOptional()
  sort: ReviewSort;
}
