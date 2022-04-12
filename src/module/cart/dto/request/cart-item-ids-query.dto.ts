import { IsOptional } from 'class-validator';

import { CartItemRequestDec } from '../decorator';

export class CartItemIdsQuery {
  @CartItemRequestDec.cartItemIds()
  @IsOptional()
  id: number[];
}
