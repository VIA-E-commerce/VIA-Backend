import { applyDecorators } from '@nestjs/common';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsString,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';

import {
  getIsDateMessage,
  getIsIntMessage,
  getIsStringMessage,
  getMaxLengthMessage,
  getMinMessage,
  SwaggerEntityDoc,
} from '@/common';

import { ORDER } from '../../constants';
import { Order } from '../../entities';
import { OrderStatus, PaymentMethod } from '../../enums';
import { AddressValidation, UserValidation } from '../customer';

export const OrderValidation: SwaggerEntityDoc<Order> = {
  totalPrice(propertyName?: string) {
    const property = propertyName || ORDER.TOTAL_PRICE.KR;
    return applyDecorators(
      IsInt({ message: getIsIntMessage({ property }) }),
      Min(ORDER.TOTAL_PRICE.MIN, {
        message: getMinMessage({ property, min: ORDER.TOTAL_PRICE.MIN }),
      }),
    );
  },

  paymentReal(propertyName?: string) {
    const property = propertyName || ORDER.PAYMENT_REAL.KR;
    return applyDecorators(
      IsInt({ message: getIsIntMessage({ property }) }),
      Min(ORDER.PAYMENT_REAL.MIN, {
        message: getMinMessage({ property, min: ORDER.PAYMENT_REAL.MIN }),
      }),
    );
  },

  point(propertyName?: string) {
    const property = propertyName || ORDER.POINT.KR;
    return applyDecorators(UserValidation.point(property));
  },

  purchaser(propertyName?: string) {
    const property = propertyName || ORDER.PURCHASER.KR;
    return applyDecorators(UserValidation.name(property));
  },

  purchaserPhone(propertyName?: string) {
    const property = propertyName || ORDER.PURCHASER_PHONE.KR;
    return applyDecorators(UserValidation.phone(property));
  },

  purchaserEmail(propertyName?: string) {
    const property = propertyName || ORDER.PURCHASER_EMAIL.KR;
    return applyDecorators(UserValidation.email(property));
  },

  recipient(propertyName?: string) {
    const property = propertyName || ORDER.RECIPIENT.KR;
    return applyDecorators(UserValidation.name(property));
  },

  recipientPhone(propertyName?: string) {
    const property = propertyName || ORDER.RECIPIENT_PHONE.KR;
    return applyDecorators(UserValidation.phone(property));
  },

  postalCode(propertyName?: string) {
    const property = propertyName || ORDER.POSTAL_CODE.KR;
    return applyDecorators(AddressValidation.postalCode(property));
  },

  shippingAddress(propertyName?: string) {
    const property = propertyName || ORDER.SHIPPING_ADDRESS.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
      MaxLength(ORDER.SHIPPING_ADDRESS.MAX_LENGTH, {
        message: getMaxLengthMessage({
          property,
          maxLength: ORDER.SHIPPING_ADDRESS.MAX_LENGTH,
        }),
      }),
    );
  },

  message() {
    const property = ORDER.MESSAGE.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
      MaxLength(ORDER.MESSAGE.MAX_LENGTH, {
        message: getMaxLengthMessage({
          property,
          maxLength: ORDER.MESSAGE.MAX_LENGTH,
        }),
      }),
    );
  },

  status() {
    const property = ORDER.STATUS.KR;
    return applyDecorators(
      ValidateIf((value) => value === ''),
      IsEnum(OrderStatus, {
        message: `${property} 값이 유효하지 않습니다.`,
      }),
    );
  },

  paymentMethod() {
    const property = ORDER.PAYMENT_METHOD.KR;
    return applyDecorators(
      IsEnum(PaymentMethod, {
        message: `지원하지 않는 ${property}입니다.`,
      }),
    );
  },

  arrivedAt() {
    const property = ORDER.ARRIVED_AT.KR;
    return applyDecorators(
      IsDate({
        message: getIsDateMessage({ property }),
      }),
    );
  },

  paidAt() {
    const property = ORDER.PAID_AT.KR;
    return applyDecorators(
      IsDate({
        message: getIsDateMessage({ property }),
      }),
    );
  },
};
