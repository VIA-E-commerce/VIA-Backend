import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Pagination } from '@/common';

import { ControllerDoc as Doc } from './doc';
import { ProductListQuery } from './dto';
import { Product } from './entity';
import { ProductService } from './product.service';

@ApiTags('상품 API')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Doc.getAll('상품 목록 조회')
  @Get()
  async getAll(
    @Query() { pageNum = 1, pageSize = 10, ...rest }: ProductListQuery,
  ): Promise<Pagination<Product>> {
    return this.productService.getAll({ pageNum, pageSize, ...rest });
  }

  @Doc.getOne('상품 상세 정보 조회')
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Product> {
    return this.productService.getOne(id);
  }
}
