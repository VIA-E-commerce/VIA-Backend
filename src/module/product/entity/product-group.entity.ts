import { Column, Entity } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { ProductGroupDoc as Doc } from '../doc';
import { PRODUCT_GROUP } from '../product.constant';

@Entity()
export class ProductGroup extends CommonIdEntity {
  @Doc.name()
  @Column({
    length: PRODUCT_GROUP.NAME.MAX_LENGTH,
  })
  name: string;

  @Doc.code()
  @Column({
    length: PRODUCT_GROUP.CODE.MAX_LENGTH,
    unique: true,
  })
  code: string;
}
