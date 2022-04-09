import { EntityRepository, Repository } from 'typeorm';

import { Color } from '@/models';

@EntityRepository(Color)
export class ColorRepository extends Repository<Color> {
  async findByProductId(productId: number) {
    return this.createQueryBuilder('color')
      .innerJoin('color.variants', 'variant')
      .innerJoin('variant.product', 'product')
      .where('product.id = :productId', { productId })
      .getMany();
  }
}
