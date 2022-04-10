import { OrderDoc } from '@/docs';
import { OrderStatus, PaymentMethod } from '@/models';

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
