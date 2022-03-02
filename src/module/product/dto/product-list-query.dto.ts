import { ApiProperty } from '@nestjs/swagger';

import { PagingQuery } from '@/common';

import { ProductSort } from '../enum';

export class ProductListQuery extends PagingQuery {
  @ApiProperty({
    description: '상품 그룹 영문 코드',
    example: 'outer',
    required: false,
  })
  category: string;

  @ApiProperty({
    description: '정렬 기준',
    example: ProductSort.PRICE_ASC,
    required: false,
  })
  sort: ProductSort;
}
