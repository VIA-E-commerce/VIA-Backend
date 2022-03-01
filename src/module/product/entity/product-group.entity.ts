import { Entity } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { ProductGroupDoc as Doc } from '../doc';

@Entity()
export class ProductGroup extends CommonIdEntity {
  @Doc.name()
  name: string;

  @Doc.code()
  code: string;
}
