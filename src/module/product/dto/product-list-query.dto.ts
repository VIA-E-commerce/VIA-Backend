import { ApiProperty } from '@nestjs/swagger';
import { PagingQuery } from '@/common';

export class ProductListQuery extends PagingQuery {
  @ApiProperty({
    description: '상품 그룹 영문 코드',
    example: 'outer',
    required: false,
  })
  group: string;
}
