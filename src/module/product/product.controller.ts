import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Pagination, PagingQuery } from '@/common';
import { ReviewService } from '@/module/review';

import {
  ProductListQuery,
  ProductIdParam,
  ProductCardResponse,
  ProductDetailResponse,
} from './dto';
import { ProductService } from './product.service';
import { ProductControllerDoc as Doc } from './product.controller.doc';

@ApiTags('상품 API')
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly reviewService: ReviewService,
  ) {}

  @Doc.getAll('상품 목록 조회')
  @Get()
  async getAll(
    @Query() { pageNum = 1, pageSize = 10, ...rest }: ProductListQuery,
  ): Promise<Pagination<ProductCardResponse>> {
    return this.productService.getAll({ pageNum, pageSize, ...rest });
  }

  @Doc.getOne('상품 상세 정보 조회')
  @Get(':productId')
  async getOne(
    @Param() { productId }: ProductIdParam,
  ): Promise<ProductDetailResponse> {
    return this.productService.getOne(productId);
  }

  @Doc.getReviews('상품 관련 리뷰 목록 조회')
  @Get(':productId/reviews')
  async getReviews(
    @Param() { productId }: ProductIdParam,
    @Query() pagingQuery: PagingQuery,
  ) {
    return this.reviewService.getReviewsByProductId(productId, pagingQuery);
  }
}
