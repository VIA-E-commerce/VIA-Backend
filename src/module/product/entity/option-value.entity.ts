import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { OPTION_VALUE } from '../product.constant';
import { Option } from './option.entity';
import { Variant } from '@/module/product';

@Entity()
export class OptionValue extends CommonIdEntity {
  @Column({
    length: OPTION_VALUE.VALUE.MAX_LENGTH,
  })
  value: string;

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
  @ManyToOne(() => Option, ({ values }) => values, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    primary: true,
  })
  option: Option;

  @ManyToMany(() => Variant, ({ optionValues }: Variant) => optionValues)
  variants: Variant[];
}
