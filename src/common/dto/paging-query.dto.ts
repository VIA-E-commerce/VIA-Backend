import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PagingQuery {
  @ApiProperty({
    name: 'pageNum',
    description: '현재 페이지 번호',
    example: 1,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageNum = 1;

  @ApiProperty({
    name: 'pageSize',
    description: '한 페이지의 상품 개수',
    example: 10,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize = 2;
}
