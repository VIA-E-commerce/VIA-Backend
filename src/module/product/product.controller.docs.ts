import { applyDecorators } from '@nestjs/common';

import { SwaggerMethodDoc } from '@/common';

import { ProductController } from './product.controller';
import { ApiOperation } from '@nestjs/swagger';

export const Docs: SwaggerMethodDoc<ProductController> = {
  list(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '진열 여부가 true인 상품 목록을 모두 조회합니다.',
      }),
    );
  },
};
