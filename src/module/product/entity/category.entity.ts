import { Column, Entity } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { CategoryDoc as Doc } from '../doc';
import { CATEGORY } from '../product.constant';

@Entity()
export class Category extends CommonIdEntity {
  @Doc.name()
  @Column({
    length: CATEGORY.NAME.MAX_LENGTH,
  })
  name: string;

  @Doc.code()
  @Column({
    length: CATEGORY.CODE.MAX_LENGTH,
    unique: true,
  })
  code: string;
}
