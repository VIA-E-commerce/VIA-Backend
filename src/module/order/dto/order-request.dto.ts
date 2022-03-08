import { Order } from '@/module/order';
import { User } from '@/module/user';

import { OrderStatus, PaymentMethod } from '../enum';
import { OrderDoc } from './order.dto.doc';

export class CreateOrderRequest {
  @OrderDoc.totalPrice()
  totalPrice: number;

  @OrderDoc.discount()
  discount: number;

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

  toEntity(user: User) {
    const entity = new Order();

    entity.totalPrice = this.totalPrice;
    entity.discount = this.discount;
    entity.recipient = this.recipient;
    entity.recipientPhone = this.recipientPhone;
    entity.postalCode = this.postalCode;
    entity.shippingAddress = this.shippingAddress;
    entity.message = this.message;
    entity.status = this.status;
    entity.paymentMethod = this.paymentMethod;
    entity.paidAt = this.paidAt;
    entity.user = user;

    return entity;
  }
}
