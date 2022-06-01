import { applyDecorators } from '@nestjs/common';

import { SizeValueDoc } from '@/docs';
import { SwaggerDoc } from '@/common';

export const SizeValueResponseDec = {
  sizeValueId() {
    return applyDecorators(SizeValueDoc.sizeValueId());
  },

  label() {
    return applyDecorators(SizeValueDoc.label());
  },

  order() {
    return applyDecorators(SwaggerDoc.order('사이즈 값 정렬 순서'));
  },
};
