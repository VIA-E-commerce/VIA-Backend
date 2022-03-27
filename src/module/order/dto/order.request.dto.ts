import { SwaggerDoc } from '@/common';
import { User } from '@/module/user';

import { Order, OrderDetail } from '../entity';
import { OrderStatus, PaymentMethod } from '../enum';
import { OrderDoc, OrderDetailDoc } from './order.dto.doc';

export class CreateOrderRequest {
  @OrderDoc.totalPrice()
  totalPrice: number;

  @OrderDoc.discount()
  discount: number;

  @OrderDoc.purchaser()
  purchaser: string;

  @OrderDoc.purchaserPhone()
  purchaserPhone: string;

  @OrderDoc.purchaserEmail()
  purchaserEmail: string;

  @OrderDoc.recipient()
  recipient: string;

  @OrderDoc.recipientPhone()
  recipientPhone: string;

  @OrderDoc.postalCode()
  postalCode: string;

  @OrderDoc.shippingAddress()
  shippingAddress: string;

  @OrderDoc.message()
  message: string;

  @OrderDoc.status()
  status: OrderStatus;

  @OrderDoc.paymentMethod()
  paymentMethod: PaymentMethod;

  @OrderDoc.paidAt()
  paidAt: Date;

  @OrderDoc.orderDetails()
  orderDetails: OrderDetailRequest[];

  toEntity(user: User) {
    const entity = new Order();

    entity.totalPrice = this.totalPrice;
    entity.discount = this.discount;

    entity.purchaser = this.purchaser;
    entity.purchaserPhone = this.purchaserPhone;
    entity.purchaserEmail = this.purchaserEmail;
    entity.recipient = this.recipient;
    entity.recipientPhone = this.recipientPhone;
    entity.postalCode = this.postalCode;
    entity.shippingAddress = this.shippingAddress;
    entity.message = this.message;

    entity.status = this.status;
    entity.paymentMethod = this.paymentMethod;

    entity.paidAt = this.paidAt;
    entity.user = user;

    entity.orderDetails = this.orderDetails.map((item) =>
      OrderDetailRequest.toEntity(item),
    );

    return entity;
  }
}

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

export class EditOrderRequest {
  @OrderDoc.recipient()
  recipient: string;

  @OrderDoc.recipientPhone()
  recipientPhone: string;

  @OrderDoc.postalCode()
  postalCode: string;

  @OrderDoc.shippingAddress()
  shippingAddress: string;

  @OrderDoc.message()
  message: string;

  @OrderDoc.status()
  status: OrderStatus;

  @OrderDoc.paymentMethod()
  paymentMethod: PaymentMethod;

  @OrderDoc.paidAt()
  paidAt: Date;
}
