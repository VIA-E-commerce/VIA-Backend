import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';

export const SizeGroupDoc = {
  sizeGroupId() {
    return applyDecorators(SwaggerDoc.id('사이즈 그룹 식별자'));
  },

  label() {
    return applyDecorators(
      ApiProperty({
        description: '사이즈 그룹 라벨',
        example: '알파벳 사이즈',
      }),
    );
  },
};
