import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  Unique,
} from 'typeorm';

import { CommonIdEntity } from '@/common';

import { OptionValueDoc as Doc } from '../doc';
import { OPTION_VALUE } from '../product.constant';
import { OptionSet } from './option-set.entity';
import { Variant } from './variant.entity';

@Unique('unq_option_value_option_set_name', ['optionSet', 'name'])
@Unique('unq_option_value_option_set_order', ['optionSet', 'order'])
@Entity()
export class OptionValue extends CommonIdEntity {
  @Doc.name()
  @Column({
    length: OPTION_VALUE.NAME.MAX_LENGTH,
  })
  name: string;

  @Doc.additionalCharge()
  @Column({
    type: 'mediumint',
    default: 0,
  })
  additionalCharge: number;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  order: number;

  // 연관 관계
  @ManyToOne(() => OptionSet, (optionSet) => optionSet.values, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  optionSet: OptionSet;

  @ManyToMany(() => Variant, (variant) => variant.optionValues)
  @JoinColumn()
  variants: Variant[];
}