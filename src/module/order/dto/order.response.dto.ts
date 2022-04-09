import { SwaggerDoc } from '@/common';
import { Order, OrderStatus, PaymentMethod } from '@/models';

import { OrderDoc } from './order.dto.doc';

export class OrderResponse {
  @SwaggerDoc.id('주문 식별자')
  id: number;

  @OrderDoc.totalPrice()
  totalPrice: number;

  @OrderDoc.paymentReal()
  paymentReal: number;

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

  @OrderDoc.arrivedAt()
  arrivedAt: Date;

  @OrderDoc.paidAt()
  paidAt: Date;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;

  constructor(order: Order) {
    this.id = order.id;
    this.totalPrice = order.totalPrice;
    this.paymentReal = order.paymentReal;

    this.purchaser = order.purchaser;
    this.purchaserPhone = order.purchaserPhone;
    this.purchaserEmail = order.purchaserEmail;
    this.recipient = order.recipient;
    this.recipientPhone = order.recipientPhone;
    this.postalCode = order.postalCode;
    this.shippingAddress = order.shippingAddress;
    this.message = order.message;

    this.status = order.status;
    this.paymentMethod = order.paymentMethod;

    this.arrivedAt = order.arrivedAt;
    this.paidAt = order.paidAt;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
  }
}
