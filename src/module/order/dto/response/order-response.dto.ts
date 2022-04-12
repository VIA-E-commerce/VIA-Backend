import { SwaggerDoc } from '@/common';
import { Order, OrderStatus, PaymentMethod } from '@/models';

import { OrderResponseDec } from '../decorator';

export class OrderResponse {
  @OrderResponseDec.orderId()
  id: number;

  @OrderResponseDec.totalPrice()
  totalPrice: number;

  @OrderResponseDec.paymentReal()
  paymentReal: number;

  @OrderResponseDec.purchaser()
  purchaser: string;

  @OrderResponseDec.purchaserPhone()
  purchaserPhone: string;

  @OrderResponseDec.purchaserEmail()
  purchaserEmail: string;

  @OrderResponseDec.recipient()
  recipient: string;

  @OrderResponseDec.recipientPhone()
  recipientPhone: string;

  @OrderResponseDec.postalCode()
  postalCode: string;

  @OrderResponseDec.shippingAddress()
  shippingAddress: string;

  @OrderResponseDec.message()
  message: string;

  @OrderResponseDec.status()
  status: OrderStatus;

  @OrderResponseDec.paymentMethod()
  paymentMethod: PaymentMethod;

  @OrderResponseDec.arrivedAt()
  arrivedAt: Date;

  @OrderResponseDec.paidAt()
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
