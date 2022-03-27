import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getPagination, Pagination } from '@/common';
import { ColorRepository } from '@/module/color';
import { SizeValueRepository } from '@/module/size';

import {
  ProductListQuery,
  ProductCardResponse,
  ProductDetailResponse,
} from './dto';
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
  }: ProductListQuery): Promise<Pagination<ProductCardResponse>> {
    const [productAlias, categoryAlias, productImageAlias] = [
      'product',
      'category',
      'image',
    ];

    const query = this.productRepository
      .createQueryBuilder(productAlias)
      .leftJoinAndSelect(`${productAlias}.category`, categoryAlias)
      .leftJoinAndSelect(`${productAlias}.images`, productImageAlias)
      .orderBy(`${productImageAlias}.order`, 'ASC')
      .skip((pageNum - 1) * pageSize)
      .take(pageSize);

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

    // // 상품 그룹별 필터링
    if (category) {
      query.where(`${categoryAlias}.code = :code`, {
        code: category,
      });
    }

    // 상품 목록 조회 (+ 페이지네이션)
    const [productList, count] = await query.getManyAndCount();

    const responseData = productList.map(
      (item) => new ProductCardResponse(item),
    );

    return getPagination(responseData, count, { pageNum, pageSize });
  }

  async getOne(productId: number): Promise<ProductDetailResponse> {
    const [productAlias, productImageAlias, variantAlias] = [
      'product',
      'image',
      'variant',
    ];

    const product = await this.productRepository
      .createQueryBuilder(productAlias)
      .leftJoinAndSelect(`${productAlias}.images`, productImageAlias)
      .where(`${productAlias}.id = :productId`, { productId })
      .leftJoinAndSelect(
        `${productAlias}.variants`,
        variantAlias,
        `${variantAlias}.product.id = ${productAlias}.id AND ${variantAlias}.hide = false`,
      )
      .orderBy(`${productImageAlias}.order`, 'ASC')
      .getOne();

    if (!product) {
      throw new HttpException(PRODUCT_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const colors = await this.colorRepository.findByProductId(productId);
    const sizeValues = await this.sizeValueRepository.findByProductId(
      productId,
    );

    return new ProductDetailResponse(product, colors, sizeValues);
  }
}
