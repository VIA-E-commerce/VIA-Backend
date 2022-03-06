import { EntityRepository, Repository } from 'typeorm';

import { Cart } from './entity';

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {
  findByUserId(userId: number) {
    return this.createQueryBuilder('cart')
      .innerJoinAndSelect('cart.items', 'cartItem')
      .innerJoinAndSelect('cartItem.variant', 'variant')
      .innerJoinAndSelect('variant.product', 'product')
      .innerJoinAndSelect('variant.color', 'color')
      .where('cart.user.id = :userId', { userId })
      .getOne();
  }
}
