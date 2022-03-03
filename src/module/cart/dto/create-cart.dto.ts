import { PickType } from '@nestjs/swagger';

import { Cart } from '../entity';
import { CartDoc } from './dto.doc';

export class CreateCartRequest extends PickType(Cart, ['quantity']) {
  @CartDoc.variantId()
  variantId: number;
}
