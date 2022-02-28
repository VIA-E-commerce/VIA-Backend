import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getPagination, Pagination } from '@/common';

import { ProductListQuery } from './dto';
import { Product } from './entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async list({
    pageNum,
    pageSize,
    group,
  }: ProductListQuery): Promise<Pagination<Product>> {
    const [productAlias, productGroupAlias] = ['product', 'group'];

    const query = this.productRepository
      .createQueryBuilder(productAlias)
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .leftJoinAndSelect(`${productAlias}.ProductGroup`, productGroupAlias);

    if (group) {
      query.where(`${productGroupAlias}.code = :group`, { group });
    }

    const [productList, count] = await query.getManyAndCount();

    return getPagination(productList, count, { pageNum, pageSize });
  }
}
