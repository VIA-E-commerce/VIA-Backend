import { Column, Entity, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { User } from '@/module/user';

import { ADDRESS } from '../address.constant';

@Entity()
export class Address extends CommonIdEntity {
  @Column({
    length: ADDRESS.LABEL.MAX_LENGTH,
  })
  label: string;

  @Column({
    type: 'char',
    length: ADDRESS.POSTAL_CODE.LENGTH,
  })
  postalCode: string;

  @Column()
  address: string;

  @Column({
    default: '',
  })
  addressDetail: string;

  @Column({
    default: false,
  })
  isHome: boolean;

  @Column({
    nullable: true,
  })
  usedAt: Date;

  // 연관 관계
  @ManyToOne(() => User, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;
}
