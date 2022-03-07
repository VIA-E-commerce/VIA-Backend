import { ApiProperty } from '@nestjs/swagger';

export class Pagination<T> {
  @ApiProperty({
    description: '전체 아이템 개수',
    example: 100,
  })
  totalElements: number;

  @ApiProperty({
    description: '전체 페이지 수',
    example: 10,
  })
  totalPages: number;

  @ApiProperty({
    description: '첫 페이지인지 여부',
    example: true,
  })
  isFirst: boolean;

  @ApiProperty({
    description: '마지막 페이지인지 여부',
    example: false,
  })
  isLast: boolean;

  list: T[];
}
