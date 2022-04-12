import { CartItemRequestDec } from '../decorator';

export class CartItemIdParam {
  @CartItemRequestDec.cartItemId()
  id: number;
}
