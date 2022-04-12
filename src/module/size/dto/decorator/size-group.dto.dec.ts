import { applyDecorators } from '@nestjs/common';

import { SwaggerValidation } from '@/common';
import { SizeGroupDoc } from '@/docs';
import { SizeGroupValidation } from '@/models';

export const SizeGroupResponseDec = {
  sizeGroupId() {
    return applyDecorators(SizeGroupDoc.sizeGroupId(), SwaggerValidation.id());
  },

  label() {
    return applyDecorators(SizeGroupDoc.label(), SizeGroupValidation.label());
  },
};
