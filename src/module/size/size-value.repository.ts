import { EntityRepository, Repository } from 'typeorm';

import { SizeValue } from './entity';

@EntityRepository(SizeValue)
export class SizeValueRepository extends Repository<SizeValue> {
  async findByProductId(productId: number) {
    return this.createQueryBuilder('sizeValue')
      .innerJoin('sizeValue.variants', 'variant')
      .innerJoin('variant.product', 'product')
      .where('product.id = :productId', { productId })
      .orderBy('sizeValue.order', 'ASC')
      .getMany();
  }
}
