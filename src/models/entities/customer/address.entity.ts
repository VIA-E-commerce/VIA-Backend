import { Column, Entity, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { ADDRESS, USER } from '../../constants';

import { User } from './user.entity';

@Entity()
export class Address extends CommonIdEntity {
  @Column({
    length: ADDRESS.LABEL.MAX_LENGTH,
  })
  label: string;

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
  address: string;

  @Column({
    default: '',
  })
  addressDetail: string;

  @Column({
    default: false,
  })
  isDefault: boolean;

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
