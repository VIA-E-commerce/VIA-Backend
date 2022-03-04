import { ApiProperty } from '@nestjs/swagger';

export class CartItemIdParam {
  @ApiProperty({
    description: '상품 품목 식별자',
    example: 1,
  })
  variantId: number;
}
