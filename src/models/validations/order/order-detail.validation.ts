import { getIsIntMessage, getMinMessage, SwaggerEntityDoc } from '@/common';
import { ORDER_DETAIL } from '@/models/constants';
import { applyDecorators } from '@nestjs/common';
import { IsInt, Min } from 'class-validator';

import { OrderDetail } from '../../entities';

export const OrderDetailValidation: SwaggerEntityDoc<OrderDetail> = {
  price() {
    const property = ORDER_DETAIL.PRICE.KR;
    return applyDecorators(
      IsInt({ message: getIsIntMessage({ property }) }),
      Min(ORDER_DETAIL.PRICE.MIN, {
        message: getMinMessage({ property, min: ORDER_DETAIL.PRICE.MIN }),
      }),
    );
  },

  quantity() {
    const property = ORDER_DETAIL.QUANTITY.KR;
    return applyDecorators(
      IsInt({ message: getIsIntMessage({ property }) }),
      Min(ORDER_DETAIL.QUANTITY.MIN, {
        message: getMinMessage({ property, min: ORDER_DETAIL.QUANTITY.MIN }),
      }),
    );
  },
};
