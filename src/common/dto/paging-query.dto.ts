import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PagingQuery {
  @ApiProperty({
    description: '현재 페이지 번호',
    example: 1,
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  pageNum: number;

  @ApiProperty({
    description: '한 페이지의 상품 개수',
    example: 10,
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize: number;
}
