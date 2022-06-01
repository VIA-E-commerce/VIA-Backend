import { applyDecorators } from '@nestjs/common';

import { OrderDetailDoc } from '@/docs';
import { OrderDetailValidation } from '@/models';

export const OrderDetailRequestDec = {
  price() {
    return applyDecorators(
      OrderDetailDoc.price(),
      OrderDetailValidation.price(),
    );
  },

  quantity() {
    return applyDecorators(
      OrderDetailDoc.quantity(),
      OrderDetailValidation.quantity(),
    );
  },
};

export const OrderDetailResponseDec = {
  price() {
    return applyDecorators(OrderDetailDoc.price());
  },

  quantity() {
    return applyDecorators(OrderDetailDoc.quantity());
  },
};
