import { ApiProperty } from '@nestjs/swagger';

import { OrderDoc, PaymentDoc } from '@/docs';
import { User, Order } from '@/models';

export class CreateOrderRequest {
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

  @PaymentDoc.impUID()
  impUID: string;

  @ApiProperty({
    description: '장바구니 아이템 식별자 목록',
    example: [1, 2],
  })
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
