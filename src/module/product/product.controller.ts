import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Product } from './entity';
import { ProductService } from './product.service';

@ApiTags('상품 API')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async list(): Promise<Product[]> {
    return this.productService.list();
  }
}
