import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { SwaggerMethodDoc } from '@/common';

import { ProductController } from '../product.controller';

export const ControllerDoc: SwaggerMethodDoc<ProductController> = {
  list(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '진열 여부가 true인 상품을 모두 조회합니다.',
      }),
    );
  },
};