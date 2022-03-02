import { CartDoc } from '@/module/cart/doc';
import { PickType } from '@nestjs/swagger';

import { Cart } from '../entity';

export class CreateCartDto extends PickType(Cart, ['quantity']) {
  @CartDoc.variantId()
  variantId: number;
}
