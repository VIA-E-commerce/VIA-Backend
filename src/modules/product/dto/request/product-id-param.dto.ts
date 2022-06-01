import { ProductRequestDec } from '../decorator';

export class ProductIdParam {
  @ProductRequestDec.productId()
  productId: number;
}
