import { Entity, OneToOne, OneToMany, JoinColumn } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { User } from '@/module/user';

import { CartItem } from './cart-item.entity';

@Entity()
export class Cart extends CommonIdEntity {
  // 연관 관계
  @OneToOne(() => User, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];
}
