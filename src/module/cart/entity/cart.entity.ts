import { Column, Entity, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { User } from '@/module/user';
import { Variant } from '@/module/product';

@Entity()
export class Cart extends CommonIdEntity {
  @Column({
    type: 'tinyint',
    unsigned: true,
    default: 1,
  })
  quantity: number;

  // 연관 관계
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Variant, {
    onDelete: 'CASCADE',
  })
  variant: Variant;
}
