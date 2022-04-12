import { applyDecorators } from '@nestjs/common';

import { OrderDoc } from '@/docs';
import { OrderValidation } from '@/models';
import { SwaggerValidation } from '@/common';

export const OrderRequestDec = {
  orderId() {
    return applyDecorators(OrderDoc.orderId(), SwaggerValidation.id());
  },

  purchaser() {
    return applyDecorators(OrderDoc.purchaser(), OrderValidation.purchaser());
  },

  purchaserPhone() {
    return applyDecorators(
      OrderDoc.purchaserPhone(),
      OrderValidation.purchaserPhone(),
    );
  },

  purchaserEmail() {
    return applyDecorators(
      OrderDoc.purchaserEmail(),
      OrderValidation.purchaserEmail(),
    );
  },

  recipient() {
    return applyDecorators(OrderDoc.recipient(), OrderValidation.recipient());
  },

  recipientPhone() {
    return applyDecorators(
      OrderDoc.recipientPhone(),
      OrderValidation.recipientPhone(),
    );
  },

  postalCode() {
    return applyDecorators(OrderDoc.postalCode(), OrderValidation.postalCode());
  },

  shippingAddress() {
    return applyDecorators(
      OrderDoc.shippingAddress(),
      OrderValidation.message(),
    );
  },

  message() {
    return applyDecorators(OrderDoc.message(), OrderValidation.message());
  },

  status() {
    return applyDecorators(OrderDoc.status(), OrderValidation.status());
  },

  paymentMethod() {
    return applyDecorators(
      OrderDoc.paymentMethod(),
      OrderValidation.paymentMethod(),
    );
  },

  arrivedAt() {
    return applyDecorators(OrderDoc.arrivedAt(), OrderValidation.arrivedAt());
  },

  paidAt() {
    return applyDecorators(OrderDoc.paidAt(), OrderValidation.paidAt());
  },
};

export const OrderResponseDec = {
  orderId() {
    return applyDecorators(OrderDoc.orderId());
  },

  totalPrice() {
    return applyDecorators(OrderDoc.totalPrice());
  },

  paymentReal() {
    return applyDecorators(OrderDoc.paymentReal());
  },

  purchaser() {
    return applyDecorators(OrderDoc.purchaser());
  },

  purchaserPhone() {
    return applyDecorators(OrderDoc.purchaserPhone());
  },

  purchaserEmail() {
    return applyDecorators(OrderDoc.purchaserEmail());
  },

  recipient() {
    return applyDecorators(OrderDoc.recipient());
  },

  recipientPhone() {
    return applyDecorators(OrderDoc.recipientPhone());
  },

  postalCode() {
    return applyDecorators(OrderDoc.postalCode());
  },

  shippingAddress() {
    return applyDecorators(OrderDoc.shippingAddress());
  },

  message() {
    return applyDecorators(OrderDoc.message());
  },

  status() {
    return applyDecorators(OrderDoc.status());
  },

  paymentMethod() {
    return applyDecorators(OrderDoc.paymentMethod());
  },

  arrivedAt() {
    return applyDecorators(OrderDoc.arrivedAt());
  },

  paidAt() {
    return applyDecorators(OrderDoc.paidAt());
  },
};
