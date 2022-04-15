import { PagingQuery } from '@/common';

import { PurchasedProductFilter } from '../../enum';

import { ProductRequestDec } from '../decorator';

export class ReviewableProductQuery extends PagingQuery {
  @ProductRequestDec.reviewableFilter()
  filter: PurchasedProductFilter;
}
