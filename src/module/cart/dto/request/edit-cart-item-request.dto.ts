import { CartRequestDec } from '../decorator';

export class EditCartItemRequest {
  @CartRequestDec.quantity()
  quantity: number;
}
