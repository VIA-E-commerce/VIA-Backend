import { Column, Entity, JoinColumn, ManyToMany } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { CATEGORY } from '../product.constant';
import { Option } from './option.entity';

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

  @ManyToMany(() => Option, (option) => option.categories)
  @JoinColumn()
  options: Option[];
}
