import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { OrderStatus, PaymentMethod } from '@/models';
import { SwaggerDoc } from '@/common';

export const OrderDoc = {
  orderId() {
    return applyDecorators(SwaggerDoc.id('주문 식별자'));
  },

  totalPrice() {
    return applyDecorators(
      ApiProperty({
        description: '총 상품 금액',
        example: 49900,
      }),
    );
  },

  paymentReal() {
    return applyDecorators(
      ApiProperty({
        description: '실결제액',
        example: 10000,
      }),
    );
  },

  point() {
    return applyDecorators(
      ApiProperty({
        description: '총 적립 포인트',
        example: 100,
      }),
    );
  },

  purchaser() {
    return applyDecorators(
      ApiProperty({
        description: '주문자',
        example: '홍길동',
      }),
    );
  },

  purchaserPhone() {
    return applyDecorators(
      ApiProperty({
        description: '주문자 연락처',
        example: '01012345678',
      }),
    );
  },

  purchaserEmail() {
    return applyDecorators(
      ApiProperty({
        description: '주문자 이메일',
        example: 'purchaser@example.com',
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
        required: false,
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
        example: PaymentMethod.card,
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

  orderDetails() {
    return applyDecorators(
      ApiProperty({
        description: '주문 상세 정보 목록',
        example: [],
      }),
    );
  },
};
