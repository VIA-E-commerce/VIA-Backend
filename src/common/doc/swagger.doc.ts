import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const SwaggerDoc = {
  id(description: string) {
    return applyDecorators(
      ApiProperty({
        description,
        example: 1,
      }),
    );
  },

  createdAt() {
    return applyDecorators(
      ApiPropertyOptional({
        example: '2022-02-22 00:00:00',
        description: '생성일',
      }),
    );
  },

  updatedAt() {
    return applyDecorators(
      ApiPropertyOptional({
        example: '2022-02-22 22:22:22',
        description: '수정일',
      }),
    );
  },
};
