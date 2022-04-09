import { EntityRepository, Repository } from 'typeorm';

import { SizeValue } from '../../entities';

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
