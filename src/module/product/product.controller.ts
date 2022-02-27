import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Product } from './entity';
import { ProductService } from './product.service';
import { Docs } from './product.controller.docs';

@ApiTags('상품 API')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Docs.list('상품 목록 조회')
  @Get()
  async list(): Promise<Product[]> {
    return this.productService.list();
  }
}
