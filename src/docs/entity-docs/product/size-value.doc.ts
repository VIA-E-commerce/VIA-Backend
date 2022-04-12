import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';

export const SizeValueDoc = {
  sizeValueId() {
    return applyDecorators(SwaggerDoc.id('사이즈 값 식별자'));
  },

  label() {
    return applyDecorators(
      ApiProperty({
        description: '사이즈 값 라벨',
        example: 'XS',
      }),
    );
  },
};
