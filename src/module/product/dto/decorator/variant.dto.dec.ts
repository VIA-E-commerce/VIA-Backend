import { applyDecorators } from '@nestjs/common';

import { SwaggerValidation } from '@/common';
import { VariantDoc } from '@/docs';

export const VariantRequestDec = {
  variantId() {
    return applyDecorators(VariantDoc.variantId(), SwaggerValidation.id());
  },
};

export const VariantResponseDec = {
  variantId() {
    return applyDecorators(VariantDoc.variantId());
  },

  quantity() {
    return applyDecorators(VariantDoc.quantity());
  },
};
