import { ArrayNotEmpty, IsOptional } from 'class-validator';

import { User, Order } from '@/models';
import { CartItemRequestDec } from '@/modules/cart';
import { ImpRequestDec } from '@/modules/payment';

import { OrderRequestDec } from '../decorator';

export class CreateOrderRequest {
  @OrderRequestDec.purchaser()
  purchaser: string;
  @OrderRequestDec.purchaserPhone()
  purchaserPhone: string;
  @OrderRequestDec.purchaserEmail()
  purchaserEmail: string;

  @OrderRequestDec.recipient()
  recipient: string;
  @OrderRequestDec.recipientPhone()
  recipientPhone: string;

  @OrderRequestDec.postalCode()
  postalCode: string;
  @OrderRequestDec.shippingAddress()
  shippingAddress: string;
  @OrderRequestDec.message()
  @IsOptional()
  message: string;

  @ImpRequestDec.impUID()
  impUID: string;

  @CartItemRequestDec.cartItemIds({ required: true })
  @ArrayNotEmpty()
  cartItemIds: number[];

  toEntity(user: User, totalPrice: number, paymentReal: number) {
    const entity = new Order();

    entity.totalPrice = totalPrice;
    entity.paymentReal = paymentReal;

    entity.purchaser = this.purchaser;
    entity.purchaserPhone = this.purchaserPhone;
    entity.purchaserEmail = this.purchaserEmail;

    entity.recipient = this.recipient;
    entity.recipientPhone = this.recipientPhone;
    entity.postalCode = this.postalCode;
    entity.shippingAddress = this.shippingAddress;
    entity.message = this.message;

    entity.user = user;

    return entity;
  }
}
