import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PagingQuery {
  @ApiPropertyOptional({
    description: '현재 페이지 번호',
    example: 1,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  pageNum: number;

  @ApiPropertyOptional({
    description: '한 페이지의 아이템 개수',
    example: 10,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize: number;
}
