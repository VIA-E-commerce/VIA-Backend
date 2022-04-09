import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const SizeGroupDoc = {
  label() {
    return applyDecorators(
      ApiProperty({
        description: '사이즈 그룹 라벨',
        example: '알파벳 사이즈',
      }),
    );
  },
};
