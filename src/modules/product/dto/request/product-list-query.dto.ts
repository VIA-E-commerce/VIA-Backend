import { IsOptional } from 'class-validator';

import { PagingQuery } from '@/common';
import { ProductSort } from '@/models';

import { ProductRequestDec } from '../decorator';

export class ProductListQuery extends PagingQuery {
  @ProductRequestDec.category()
  @IsOptional()
  category: string;

  @ProductRequestDec.sort()
  @IsOptional()
  sort: ProductSort;
}
