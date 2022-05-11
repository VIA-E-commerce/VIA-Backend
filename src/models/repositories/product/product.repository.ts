import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';

import { PagingQuery, setQuerySkipAndTake } from '@/common';

import { Product, User } from '../../entities';
import { ProductSort, PurchasedProductFilter } from '../../enums';

const [
  productAlias,
  variantAlias,
  categoryAlias,
  productImageAlias,
  orderDetailAlias,
  orderAlias,
  reviewAlias,
] = [
  'product',
  'variant',
  'category',
  'image',
  'orderDetail',
  'order',
  'review',
];

export interface ProductFilterOptions {
  discount?: boolean;
  thisMonth?: boolean;
  category?: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async getAllAndCount(
    pagingQuery: PagingQuery,
    sort: ProductSort,
    productFilterOptions: ProductFilterOptions,
  ): Promise<[Product[], number]> {
    const query = this.createQueryBuilder(productAlias)
      .leftJoinAndSelect(`${productAlias}.category`, categoryAlias)
      .leftJoinAndSelect(`${productAlias}.images`, productImageAlias)
      .orderBy(`${productImageAlias}.order`, 'ASC');

    // 페이지네이션 처리
    setQuerySkipAndTake(query, pagingQuery);

    // 정렬 방식 지정
    this.setQueryOrderBy(query, sort);

    // 상품 그룹별 필터링
    this.filterQuery(query, productFilterOptions);

    return query.getManyAndCount();
  }

  private setQueryOrderBy(
    query: SelectQueryBuilder<Product>,
    sort: ProductSort,
  ) {
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
  }

  private filterQuery(
    query: SelectQueryBuilder<Product>,
    { discount, thisMonth, category }: ProductFilterOptions,
  ) {
    if (discount) {
      query.where(`${productAlias}.retailPrice > ${productAlias}.sellingPrice`);
    } else if (thisMonth) {
      query.where(
        `${productAlias}.createdAt BETWEEN DATE_ADD(NOW(), INTERVAL -1 MONTH) AND NOW()`,
      );
    } else if (category) {
      query.where(`${categoryAlias}.code = :code`, {
        code: category,
      });
    }
  }

  async isProductSoldOut(productId: number) {
    const { sum } = await this.createQueryBuilder(productAlias)
      .select(`SUM(${variantAlias}.quantity)`, 'sum')
      .leftJoinAndSelect(`${productAlias}.variants`, variantAlias)
      .where(`${productAlias}.id = :id`, { id: productId })
      .getRawOne();

    return sum == 0;
  }

  async getProductDetail(productId: number) {
    return this.createQueryBuilder(productAlias)
      .leftJoinAndSelect(`${productAlias}.images`, productImageAlias)
      .where(`${productAlias}.id = :productId`, { productId })
      .leftJoinAndSelect(
        `${productAlias}.variants`,
        variantAlias,
        `${variantAlias}.product.id = ${productAlias}.id AND ${variantAlias}.hide = false`,
      )
      .orderBy(`${productImageAlias}.order`, 'ASC')
      .getOne();
  }

  async getPurchasedProductsAndCount(
    user: User,
    pagingQuery: PagingQuery,
    filter: PurchasedProductFilter,
  ): Promise<[Product[], number]> {
    let query = this.createQueryBuilder(productAlias)
      .innerJoin(`${productAlias}.variants`, variantAlias)
      .leftJoinAndSelect(`${productAlias}.images`, productImageAlias)
      .innerJoin(`${variantAlias}.orderDetails`, orderDetailAlias)
      .innerJoin(`${orderDetailAlias}.order`, orderAlias)
      .where(`${orderAlias}.user.id = :userId`, { userId: user.id });

    // 페이지네이션 처리
    setQuerySkipAndTake(query, pagingQuery);

    // 리뷰할 수 있는 상품 조회
    if (filter === PurchasedProductFilter.REVIEWABLE) {
      query = query
        .leftJoin(
          `${productAlias}.reviews`,
          reviewAlias,
          `${reviewAlias}.user.id = ${orderAlias}.user.id`,
        )
        .andWhere(`${reviewAlias}.user.id IS NULL`);
    }

    return query.getManyAndCount();
  }
}
