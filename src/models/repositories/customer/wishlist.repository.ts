import { EntityRepository, Repository } from 'typeorm';

import { User, Wishlist } from '../../entities';

@EntityRepository(Wishlist)
export class WishlistRepository extends Repository<Wishlist> {
  async isProductWished(productId: number, user: User): Promise<boolean> {
    if (!user) return false;

    const result = await this.findOne({
      where: { product: { id: productId }, user },
    });

    return !!result;
  }
}
