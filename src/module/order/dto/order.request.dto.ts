import { User } from '@/module/user';
import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';
import { PaymentDoc } from '@/module/payment/dto';

import { Order, OrderDetail } from '../entity';
import { OrderStatus, PaymentMethod } from '../enum';
import { OrderDoc, OrderDetailDoc } from './order.dto.doc';

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
