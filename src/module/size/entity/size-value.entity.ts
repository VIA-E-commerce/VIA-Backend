import { Variant } from '@/module/product';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { SIZE_VALUE } from '../size.constant';
import { SizeGroup } from './size-group.entity';

@Entity()
export class SizeValue {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    length: SIZE_VALUE.LABEL.MAX_LENGTH,
  })
  label: string;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  order: number;

  // 연관 관계
  @ManyToOne(() => SizeGroup, (sizeGroup) => sizeGroup.values, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  sizeGroup: SizeGroup;

  @OneToMany(() => Variant, (variant) => variant.sizeValue)
  variants: Variant[];
}
