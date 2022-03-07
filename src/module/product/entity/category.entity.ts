import { Column, Entity, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { SizeGroup } from '@/module/size';

import { CATEGORY } from '../product.constant';

@Entity()
export class Category extends CommonIdEntity {
  @Column({
    length: CATEGORY.NAME.MAX_LENGTH,
  })
  name: string;

  @Column({
    length: CATEGORY.CODE.MAX_LENGTH,
    unique: true,
  })
  code: string;

  // 연관 관계
  @ManyToOne(() => SizeGroup, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  sizeGroup: SizeGroup;
}
