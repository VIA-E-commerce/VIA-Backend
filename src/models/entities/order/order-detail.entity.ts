import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { Variant } from '@/models';

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
  @ManyToOne(() => Variant, (variant) => variant.orderDetails, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  variant: Variant;

  @RelationId((orderDetail: OrderDetail) => orderDetail.variant)
  variantId: number;

  @ManyToOne(() => Order, (order) => order.orderDetails, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  order: Order;
}
