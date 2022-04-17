import { PagingQuery } from '@/common';

import { PurchasedProductFilter } from '@/models';

import { ProductRequestDec } from '../decorator';

export class ReviewableProductQuery extends PagingQuery {
  @ProductRequestDec.reviewableFilter()
  filter: PurchasedProductFilter;
}
