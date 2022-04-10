import { ApiPropertyOptional } from '@nestjs/swagger';

import { PagingQuery } from '@/common';

import { ProductSort } from '../enum';

export class ProductListQuery extends PagingQuery {
  @ApiPropertyOptional({
    description: '상품 그룹 영문 코드',
    example: 'outer',
  })
  category: string;

  @ApiPropertyOptional({
    description: '정렬 기준',
    example: ProductSort.PRICE_ASC,
  })
  sort: ProductSort;
}
