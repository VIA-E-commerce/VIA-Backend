import { EntityRepository, Repository } from 'typeorm';

import { Product } from '@/models';

const [productAlias, variantAlias] = ['product', 'variant'];

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async isProductSoldOut(productId: number) {
    const { sum } = await this.createQueryBuilder(productAlias)
      .select(`SUM(${variantAlias}.quantity)`, 'sum')
      .leftJoinAndSelect(`${productAlias}.variants`, variantAlias)
      .where(`${productAlias}.id = :id`, { id: productId })
      .getRawOne();

    return !sum;
  }
}
