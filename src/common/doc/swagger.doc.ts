import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const SwaggerDoc = {
  id() {
    return applyDecorators(
      ApiProperty({
        description: '식별자',
        example: 1,
      }),
    );
  },
};
