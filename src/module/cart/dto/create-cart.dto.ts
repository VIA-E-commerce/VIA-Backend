import { CartDoc } from './dto.doc';

export class CreateCartRequest {
  @CartDoc.variantId()
  variantId: number;

  @CartDoc.quantity()
  quantity: number;
}
