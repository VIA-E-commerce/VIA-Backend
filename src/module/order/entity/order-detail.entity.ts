import { Column, Entity, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { Variant } from '@/module/product';
import { Order } from './order.entity';

@Entity()
export class OrderDetail extends CommonIdEntity {
  @Column({
    type: 'mediumint',
    unsigned: true,
  })
  price: number;

  @Column({
    type: 'smallint',
    unsigned: true,
  })
  quantity: number;

  // 연관 관계
  @ManyToOne(() => Variant, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  variant: Variant;

  @ManyToOne(() => Order, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  order: Order;
}
