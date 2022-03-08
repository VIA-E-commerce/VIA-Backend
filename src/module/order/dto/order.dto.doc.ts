import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { OrderStatus, PaymentMethod } from '../enum';

export const OrderDoc = {
  totalPrice() {
    return applyDecorators(
      ApiProperty({
        description: '총 상품 가격',
        example: 49900,
      }),
    );
  },

  discount() {
    return applyDecorators(
      ApiProperty({
        description: '할인액',
        example: 10000,
      }),
    );
  },

  recipient() {
    return applyDecorators(
      ApiProperty({
        description: '수령인',
        example: '홍길동',
      }),
    );
  },

  recipientPhone() {
    return applyDecorators(
      ApiProperty({
        description: '수령인 연락처',
        example: '01012345678',
      }),
    );
  },

  postalCode() {
    return applyDecorators(
      ApiProperty({
        description: '우편 번호',
        example: '12345',
      }),
    );
  },

  shippingAddress() {
    return applyDecorators(
      ApiProperty({
        description: '배송지 주소',
        example: '서울특별시 종로구 세종대로 209, 1403호(세종로)',
      }),
    );
  },

  message() {
    return applyDecorators(
      ApiProperty({
        description: '배송 메시지',
        example: '부재시 경비실에 맡겨주세요',
      }),
    );
  },

  status() {
    return applyDecorators(
      ApiProperty({
        description: '주문 상태',
        example: OrderStatus.AWAITING_PAYMENT,
      }),
    );
  },

  paymentMethod() {
    return applyDecorators(
      ApiProperty({
        description: '결제 수단',
        example: PaymentMethod.ACCOUNT_TRANSFER,
      }),
    );
  },

  arrivedAt() {
    return applyDecorators(
      ApiProperty({
        description: '도착일',
        example: '2022-01-01 00:00:00',
      }),
    );
  },

  paidAt() {
    return applyDecorators(
      ApiProperty({
        description: '결제일',
        example: '2022-01-01 00:00:00',
      }),
    );
  },
};
