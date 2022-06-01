import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';

import { Pagination, SwaggerMethodDoc } from '@/common';
import { ProductCardResponse, ProductDetailResponse } from '@/modules/product';
import { QuestionResponse } from '@/modules/question';
import { ReviewResponse } from '@/modules/review';

import { ProductController } from './product.controller';

export const ProductControllerDoc: SwaggerMethodDoc<ProductController> = {
  getAll(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '진열 여부가 true인 상품을 모두 조회합니다.',
      }),
      ApiExtraModels(Pagination, ProductCardResponse),
      ApiOkResponse({
        description: '상품 목록 조회 성공',
        schema: {
          allOf: [
            { $ref: getSchemaPath(Pagination) },
            {
              properties: {
                data: {
                  type: 'array',
                  items: { $ref: getSchemaPath(ProductCardResponse) },
                },
              },
            },
          ],
        },
      }),
    );
  },

  getOne(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '상품 옵션을 포함한 상품 상세 정보를 조회합니다.',
      }),
      ApiOkResponse({
        description: '상품 상세 정보 조회 성공',
        type: ProductDetailResponse,
      }),
    );
  },

  getReviews(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '상품에 달린 리뷰 목록을 조회합니다.',
      }),
      ApiOkResponse({
        description: '리뷰 목록 조회 성공',
        schema: {
          allOf: [
            { $ref: getSchemaPath(Pagination) },
            {
              properties: {
                data: {
                  type: 'array',
                  items: { $ref: getSchemaPath(ReviewResponse) },
                },
              },
            },
          ],
        },
      }),
    );
  },

  getQuestions(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '상품에 관한 고객 문의 목록을 조회합니다.',
      }),
      ApiOkResponse({
        description: '문의 목록 조회 성공',
        type: [QuestionResponse],
      }),
    );
  },

  addToWishlist(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '선택한 상품을 위시리스트에 추가합니다.',
      }),
      ApiOkResponse({
        description: '위시리스트 추가 성공',
      }),
    );
  },

  removeFromWishlist(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '상품을 위시리스트에서 제거합니다.',
      }),
      ApiOkResponse({
        description: '위시리스트 제거 성공',
      }),
    );
  },
};
