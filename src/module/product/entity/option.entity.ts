import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { InputType } from '../enum';
import { Category } from './category.entity';
import { OPTION } from '../product.constant';
import { Product } from './product.entity';
import { OptionValue } from './option-value.entity';

@Entity()
export class Option extends CommonIdEntity {
  @Column({
    length: OPTION.LABEL.MAX_LENGTH,
  })
  label: string;

  @Column({
    length: OPTION.DESCRIPTION.MAX_LENGTH,
    nullable: true,
  })
  description: string;

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
  @OneToMany(() => OptionValue, (values) => values.option, {
    cascade: ['insert'],
    eager: true,
  })
  values: OptionValue[];

  @ManyToMany(() => Category, (category) => category.options)
  @JoinTable({
    name: 'category_option',
  })
  categories: Category[];

  @ManyToMany(() => Product, (product) => product.options)
  @JoinTable({
    name: 'product_option',
  })
  products: Product[];
}
