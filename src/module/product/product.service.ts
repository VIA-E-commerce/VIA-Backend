import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { getPagination, Pagination } from '@/common';
import { ColorRepository } from '@/module/color';
import { SizeValueRepository } from '@/module/size';

import { ProductListQuery, ProductDetailResponse } from './dto';
import { Product } from './entity';
import { ProductSort } from './enum';
import { PRODUCT_ERROR } from './product.constant';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly colorRepository: ColorRepository,
    private readonly sizeValueRepository: SizeValueRepository,
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

  async getOne(id: number): Promise<ProductDetailResponse> {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!product) {
      throw new HttpException(PRODUCT_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const colors = await this.colorRepository.findByProductId(id);
    const sizeValues = await this.sizeValueRepository.findByProductId(id);

    return new ProductDetailResponse(product, colors, sizeValues);
  }
}
