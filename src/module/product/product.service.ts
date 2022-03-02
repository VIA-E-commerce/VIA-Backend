import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getPagination, Pagination } from '@/common';

import { ProductListQuery } from './dto';
import { Product } from './entity';
import { ProductSort } from './enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async list({
    pageNum,
    pageSize,
    category,
    sort,
  }: ProductListQuery): Promise<Pagination<Product>> {
    const [productAlias, categoryAlias] = ['product', 'category'];

    // 상품 목록 조회 (+ 페이지네이션)
    const query = this.productRepository
      .createQueryBuilder(productAlias)
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .leftJoinAndSelect(`${productAlias}.Category`, categoryAlias);

    // 상품 그룹별 필터링
    if (category) {
      query.where(`${categoryAlias}.code = :category`, { category });
    }

    // 정렬 방식 지정
    switch (sort) {
      case ProductSort.PRICE_ASC:
        query.orderBy(`${productAlias}.sellingPrice`, 'ASC');
        break;
      case ProductSort.PRICE_DESC:
        query.orderBy(`${productAlias}.sellingPrice`, 'DESC');
        break;
      case ProductSort.BEST_SELLING:
        query.orderBy(`${productAlias}.salesVolume`, 'DESC');
        break;
      case ProductSort.REVIEW_DESC:
        query.orderBy(`${productAlias}.reviewCount`, 'DESC');
        break;
      default:
        query.orderBy(`${productAlias}.createdAt`, 'DESC');
    }

    const [productList, count] = await query.getManyAndCount();

    return getPagination(productList, count, { pageNum, pageSize });
  }

  async getOne(id: number): Promise<Product> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .select(['product'])
      .where('product.id = :id', { id });

    // Option Set 조인
    query
      .leftJoin('product.optionSets', 'opt')
      .addSelect(['opt.id', 'opt.name', 'opt.inputType', 'opt.order']);

    // Option Value 조인
    query
      .leftJoin('opt.values', 'val')
      .addSelect(['val.id', 'val.name', 'val.additionalCharge', 'val.order']);

    return query.getOne();
  }
}
