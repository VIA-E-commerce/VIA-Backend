import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Pagination, PagingQuery } from '@/common';
import { ReviewService, ReviewResponse } from '@/module/review';
import { QuestionService, QuestionResponse } from '@/module/question';
import { ReviewListQuery } from '@/module/review';

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
    private readonly questionService: QuestionService,
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
    @Query() { pageNum = 1, pageSize = 5, sort }: ReviewListQuery,
  ): Promise<Pagination<ReviewResponse>> {
    return this.reviewService.getReviewsByProductId(productId, {
      pageNum,
      pageSize,
      sort,
    });
  }

  @Doc.getQuestions('상품 관련 문의 목록 조회')
  @Get(':productId/questions')
  async getQuestions(
    @Param() { productId }: ProductIdParam,
    @Query() { pageNum = 1, pageSize = 5 }: PagingQuery,
  ): Promise<Pagination<QuestionResponse>> {
    return this.questionService.getQuestionsByProductId(productId, {
      pageNum,
      pageSize,
    });
  }
}
