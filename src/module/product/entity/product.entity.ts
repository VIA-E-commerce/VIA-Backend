import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { ProductDoc as Doc } from '../doc';
import { PRODUCT } from '../product.constant';
import { Category } from './category.entity';
import { OptionSet } from './option-set.entity';

@Entity()
export class Product extends CommonIdEntity {
  @Doc.name()
  @Column({
    length: PRODUCT.NAME.MAX_LENGTH,
  })
  name: string;

  @Doc.retailPrice()
  @Column({
    type: 'mediumint',
    unsigned: true,
    nullable: true,
  })
  retailPrice: number;

  @Doc.sellingPrice()
  @Column({
    type: 'mediumint',
    unsigned: true,
  })
  sellingPrice: number;

  // 통계 속성
  @Doc.salesVolume()
  @Column({
    unsigned: true,
    default: 0,
  })
  salesVolume: number;

  @Doc.reviewCount()
  @Column({
    unsigned: true,
    default: 0,
  })
  reviewCount: number;

  @Doc.wishCount()
  @Column({
    unsigned: true,
    default: 0,
  })
  wishCount: number;

  // check 옵션
  @Doc.display()
  @Column({
    default: 1,
  })
  display: boolean;

  @Doc.onSale()
  @Column({
    default: 1,
  })
  onSale: boolean;

  // 연관 관계
  @ManyToOne(() => Category, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  category: Category;

  @ManyToMany(() => OptionSet, (optionSet) => optionSet.products)
  @JoinColumn()
  optionSets: OptionSet[];
}
