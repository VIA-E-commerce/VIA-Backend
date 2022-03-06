import { SwaggerDoc } from '@/common';
import { ApiProperty } from '@nestjs/swagger';

import { CartDoc } from './dto.doc';

export class AddCartItemRequest {
  @SwaggerDoc.id('상품 식별자')
  productId: number;

  variantId: number;

  @ApiProperty({
    description: '상품 옵션 값 식별자 목록',
    example: [1, 5],
  })
  optionValueIds: number[];

  @CartDoc.quantity()
  quantity: number;
}
