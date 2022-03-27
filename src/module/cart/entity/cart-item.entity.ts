import { Column, Entity, ManyToOne, Unique } from 'typeorm';

import { Variant } from '@/module/product';

import { Cart } from './cart.entity';
import { CommonIdEntity } from '@/common';

@Unique('uq_cart_variant', ['cart', 'variant'])
@Entity()
export class CartItem extends CommonIdEntity {
  @ManyToOne(() => Cart, (cart) => cart.items, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  cart: Cart;

  @ManyToOne(() => Variant, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  variant: Variant;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: 1,
  })
  quantity: number;
}
