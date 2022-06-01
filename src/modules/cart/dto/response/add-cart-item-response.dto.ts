import { CartItemResponseDec } from '../decorator';

export class AddCartItemResponse {
  @CartItemResponseDec.cartItemId()
  id: number;

  @CartItemResponseDec.addCartItemMessage()
  message?: string;
}
