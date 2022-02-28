import { Entity } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { ProductGroupMetaInfo as MetaInfo } from './meta-info';

@Entity()
export class ProductGroup extends CommonIdEntity {
  @MetaInfo.name()
  name: string;

  @MetaInfo.code()
  code: string;
}
