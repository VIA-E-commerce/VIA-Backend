import { Controller, Get, Query } from '@nestjs/common';
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

  @Doc.list('상품 목록 조회')
  @Get()
  async list(
    @Query() { pageNum = 1, pageSize = 10, ...rest }: ProductListQuery,
  ): Promise<Pagination<Product>> {
    return this.productService.list({ pageNum, pageSize, ...rest });
  }
}
