import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getPagination, Pagination, PagingOptions } from '@/common';

import { Product } from './entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async list(pagingOptions: PagingOptions): Promise<Pagination<Product>> {
    const { pageNum, pageSize } = pagingOptions;

    const product = await this.productRepository.findAndCount({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      where: { show: true },
    });

    return getPagination(product[0], product[1], pagingOptions);
  }
}
