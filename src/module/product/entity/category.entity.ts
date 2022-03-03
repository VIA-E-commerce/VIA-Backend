import { Column, Entity } from 'typeorm';

import { CommonIdEntity } from '@/common';

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
}
