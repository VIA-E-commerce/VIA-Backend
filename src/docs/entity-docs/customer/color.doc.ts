import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';

export const ColorDoc = {
  colorId() {
    return applyDecorators(SwaggerDoc.id('색상 식별자'));
  },

  label() {
    return applyDecorators(
      ApiProperty({
        description: '색상 라벨',
        example: '블랙',
      }),
    );
  },

  hexCode() {
    return applyDecorators(
      ApiProperty({
        description: '색상 코드',
        example: '000000',
      }),
    );
  },
};
