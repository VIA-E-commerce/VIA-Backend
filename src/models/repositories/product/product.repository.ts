import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';

import { PagingQuery, setQuerySkipAndTake } from '@/common';
import { Product } from '@/models';

import { ProductSort } from '../../enums';

const [productAlias, variantAlias, categoryAlias, productImageAlias] = [
  'product',
  'variant',
  'category',
  'image',
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

    return !sum;
  }
}
