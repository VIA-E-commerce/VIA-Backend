import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Pagination } from '@/common';

import {
  ProductListQuery,
  ProductIdParam,
  ProductCardResponse,
  ProductDetailResponse,
} from './dto';
import { ProductService } from './product.service';
import { ProductControllerDoc as Doc } from './controller.doc';

@ApiTags('상품 API')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Doc.getAll('상품 목록 조회')
  @Get()
  async getAll(
    @Query() { pageNum = 1, pageSize = 10, ...rest }: ProductListQuery,
  ): Promise<Pagination<ProductCardResponse>> {
    return this.productService.getAll({ pageNum, pageSize, ...rest });
  }

  @Doc.getOne('상품 상세 정보 조회')
  @Get(':id')
  async getOne(
    @Param() { id }: ProductIdParam,
  ): Promise<ProductDetailResponse> {
    return this.productService.getOne(id);
  }
}
