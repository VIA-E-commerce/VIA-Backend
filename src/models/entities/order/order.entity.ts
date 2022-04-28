import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { ADDRESS, ORDER, USER } from '../../constants';
import { OrderStatus, PaymentMethod } from '../../enums';
import { User } from '../customer';

import { OrderDetail } from './order-detail.entity';

@Entity()
export class Order extends CommonIdEntity {
  @Column({
    unsigned: true,
  })
  totalPrice: number;

  @Column({
    unsigned: true,
    default: 0,
  })
  paymentReal: number;

  @Column({
    default: 0,
  })
  point: number;

  @Column({
    length: USER.NAME.MAX_LENGTH,
  })
  purchaser: string;

  @Column({
    type: 'char',
    length: USER.PHONE.MAX_LENGTH,
  })
  purchaserPhone: string;

  @Column({
    length: USER.EMAIL.MAX_LENGTH,
  })
  purchaserEmail: string;

  @Column({
    length: USER.NAME.MAX_LENGTH,
  })
  recipient: string;

  @Column({
    type: 'char',
    length: USER.PHONE.MAX_LENGTH,
  })
  recipientPhone: string;

  @Column({
    type: 'char',
    length: ADDRESS.POSTAL_CODE.LENGTH,
  })
  postalCode: string;

  @Column()
  shippingAddress: string;

  @Column({
    length: ORDER.MESSAGE.MAX_LENGTH,
    default: '',
  })
  message: string;

  @Column({
    default: OrderStatus.AWAITING_PAYMENT,
  })
  status: OrderStatus;

  @Column()
  paymentMethod: PaymentMethod;

  @Column({
    unique: true,
  })
  merchantUID: string;

  @Column({
    nullable: true,
  })
  arrivedAt: Date;

  @Column({
    nullable: true,
  })
  paidAt: Date;

  // 연관 관계
  @ManyToOne(() => User, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  user: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    cascade: ['insert', 'update'],
  })
  orderDetails: OrderDetail[];
}
