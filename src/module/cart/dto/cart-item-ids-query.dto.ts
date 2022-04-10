import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CartItemIdsQuery {
  @ApiProperty({
    type: 'number',
    isArray: true,
    description: '장바구니 아이템 식별자 목록',
    example: [1, 2],
    required: false,
  })
  @Transform(({ value }) => value.split(',').map(Number))
  id: number[];
}
