import { applyDecorators } from '@nestjs/common';

import { SwaggerValidation } from '@/common';
import { CategoryDoc } from '@/docs';

export const CategoryRequestDec = {
  categoryId() {
    return applyDecorators(CategoryDoc.categoryId(), SwaggerValidation.id());
  },
};

export const CategoryResponseDec = {
  categoryId() {
    return applyDecorators(CategoryDoc.categoryId());
  },

  name() {
    return applyDecorators(CategoryDoc.name());
  },

  code() {
    return applyDecorators(CategoryDoc.code());
  },
};
