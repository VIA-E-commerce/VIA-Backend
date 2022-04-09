import { Entity, ManyToOne, Unique } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { Product } from '../product';

import { User } from './user.entity';

@Unique('uq_product_user', ['product', 'user'])
@Entity()
export class Wishlist extends CommonIdEntity {
  // 관계 설정
  @ManyToOne(() => Product, (product) => product.wishlist, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => User, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user: User;
}
