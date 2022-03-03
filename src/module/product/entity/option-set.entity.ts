import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';

import { CommonIdEntity } from '@/common';

import { InputType } from '../enum';
import { OPTION_SET } from '../product.constant';
import { Category } from './category.entity';
import { Product } from './product.entity';
import { OptionValue } from './option-value.entity';

@Unique('unq_option_set_category_name', ['category', 'name'])
@Unique('unq_option_set_category_order', ['category', 'order'])
@Entity()
export class OptionSet extends CommonIdEntity {
  @Column({
    length: OPTION_SET.NAME.MAX_LENGTH,
  })
  name: string;

  @Column({
    default: InputType.CHECKBOX,
  })
  inputType: InputType;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  order: number;

  // 연관 관계
  @OneToMany(() => OptionValue, (values) => values.optionSet, {
    cascade: ['insert'],
  })
  values: OptionValue[];

  @ManyToOne(() => Category, {
    onDelete: 'SET NULL',
  })
  category: Category;

  @ManyToMany(() => Product, (product) => product.optionSets)
  @JoinTable({
    name: 'product_option',
  })
  products: Product[];
}
