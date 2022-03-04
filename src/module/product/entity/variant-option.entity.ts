import { OptionValue } from '@/module/product';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Variant } from './variant.entity';

@Entity()
export class VariantOption {
  @ManyToOne(() => Variant, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    primary: true,
  })
  variant: Variant;

  @ManyToOne(() => OptionValue, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
    primary: true,
  })
  @JoinColumn([
    { name: 'option_id', referencedColumnName: 'option' },
    { name: 'value_id', referencedColumnName: 'id' },
  ])
  value: OptionValue;
}
