import { IsOptional } from 'class-validator';

import { OrderStatus, PaymentMethod } from '@/models';

import { OrderRequestDec } from '../decorator';

export class EditOrderRequest {
  @OrderRequestDec.recipient()
  @IsOptional()
  recipient: string;
  @OrderRequestDec.recipientPhone()
  @IsOptional()
  recipientPhone: string;

  @OrderRequestDec.postalCode()
  @IsOptional()
  postalCode: string;
  @OrderRequestDec.shippingAddress()
  @IsOptional()
  shippingAddress: string;
  @OrderRequestDec.message()
  @IsOptional()
  message: string;

  @OrderRequestDec.status()
  @IsOptional()
  status: OrderStatus;

  @OrderRequestDec.paymentMethod()
  @IsOptional()
  paymentMethod: PaymentMethod;

  @OrderRequestDec.paidAt()
  @IsOptional()
  paidAt: Date;
}
