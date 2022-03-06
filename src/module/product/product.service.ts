import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

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

  async getAll({
    pageNum,
    pageSize,
    category,
    sort,
  }: ProductListQuery): Promise<Pagination<Product>> {
    const findOptions: FindManyOptions<Product> = {
      relations: ['category'],
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    };

    // 정렬 방식 지정
    switch (sort) {
      case ProductSort.PRICE_ASC:
        findOptions.order = { sellingPrice: 'ASC' };
        break;
      case ProductSort.PRICE_DESC:
        findOptions.order = { sellingPrice: 'DESC' };
        break;
      case ProductSort.BEST_SELLING:
        findOptions.order = { salesVolume: 'DESC' };
        break;
      case ProductSort.REVIEW_DESC:
        findOptions.order = { reviewCount: 'DESC' };
        break;
      default:
        findOptions.order = { createdAt: 'DESC' };
    }

    // // 상품 그룹별 필터링
    if (category) {
      findOptions.where = {
        category: {
          code: category,
        },
      };
    }

    // 상품 목록 조회 (+ 페이지네이션)
    const [productList, count] = await this.productRepository.findAndCount(
      findOptions,
    );

    return getPagination(productList, count, { pageNum, pageSize });
  }

  async getOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      relations: ['variants', 'variants.color'],
      where: {
        id,
      },
    });

    if (!product) {
      throw new HttpException('', HttpStatus.NOT_FOUND);
    }

    return product;
  }
}
