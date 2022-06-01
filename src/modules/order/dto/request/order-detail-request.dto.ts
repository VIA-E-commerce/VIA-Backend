import { OrderDetail } from '@/models';
import { VariantRequestDec } from '@/modules/product';

import { OrderDetailRequestDec } from '../decorator';

export class OrderDetailRequest {
  @OrderDetailRequestDec.price()
  price: number;

  @OrderDetailRequestDec.quantity()
  quantity: number;

  @VariantRequestDec.variantId()
  variantId: number;

  static toEntity(orderDetail: OrderDetailRequest) {
    const entity = new OrderDetail();
    entity.price = orderDetail.price;
    entity.quantity = orderDetail.quantity;
    entity.variantId = orderDetail.variantId;

    return entity;
  }
}
