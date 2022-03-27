import { EntityRepository, Repository } from 'typeorm';

import { Cart } from './entity';

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {
  findAllByUserIdAndId(userId: number, cartItemIds?: number[]) {
    const query = this.createQueryBuilder('cart')
      .innerJoinAndSelect('cart.items', 'cartItem')
      .innerJoinAndSelect('cartItem.variant', 'variant')
      .innerJoinAndSelect('variant.product', 'product')
      .innerJoinAndSelect('product.images', 'image')
      .innerJoinAndSelect('variant.color', 'color')
      .innerJoinAndSelect('variant.sizeValue', 'sizeValue')
      .where('cart.user.id = :userId', { userId });

    if (cartItemIds) {
      query.andWhere('cartItem.id IN (:...cartItemIds)', { cartItemIds });
    }

    query.orderBy('cartItem.createdAt', 'DESC');

    return query.getOne();
  }
}
