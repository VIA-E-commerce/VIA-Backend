import { Column, Entity, ManyToOne } from 'typeorm';

import { Variant } from '@/module/product';

import { Cart } from './cart.entity';
import { CommonEntity } from '@/common';

@Entity()
export class CartItem extends CommonEntity {
  @ManyToOne(() => Cart, (cart) => cart.items, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
    primary: true,
  })
  cart: Cart;

  @ManyToOne(() => Variant, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
    primary: true,
  })
  variant: Variant;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: 1,
  })
  quantity: number;
}
