import { ApiProperty } from '@nestjs/swagger';

export class EditVariantParam {
  @ApiProperty({
    description: '장바구니 아이템 식별자',
    example: 1,
  })
  cartItemId: number;

  @ApiProperty({
    description: '상품 품목 식별자',
    example: 1,
  })
  variantId: number;
}
