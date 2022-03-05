import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const SwaggerDoc = {
  id(description: string) {
    return applyDecorators(
      ApiProperty({
        description,
        example: 1,
      }),
    );
  },
};
