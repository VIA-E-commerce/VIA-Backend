import { OrderRequestDec } from '../decorator';

export class OrderIdParam {
  @OrderRequestDec.orderId()
  id: number;
}
