import { SwaggerDoc } from '@/common';
import { OrderDetailDoc } from '@/docs';
import { OrderDetail } from '@/models';

export class OrderDetailRequest {
  @OrderDetailDoc.price()
  price: number;

  @OrderDetailDoc.quantity()
  quantity: number;

  @SwaggerDoc.id('상품 품목 식별자')
  variantId: number;

  static toEntity(orderDetail: OrderDetailRequest) {
    const entity = new OrderDetail();
    entity.price = orderDetail.price;
    entity.quantity = orderDetail.quantity;
    entity.variantId = orderDetail.variantId;

    return entity;
  }
}
