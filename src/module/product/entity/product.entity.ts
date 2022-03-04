import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { PRODUCT } from '../product.constant';
import { Category } from './category.entity';
import { Option } from './option.entity';

@Entity()
export class Product extends CommonIdEntity {
  @Column({
    length: PRODUCT.NAME.MAX_LENGTH,
  })
  name: string;

  @Column({
    type: 'mediumint',
    unsigned: true,
    nullable: true,
  })
  retailPrice: number;

  @Column({
    type: 'mediumint',
    unsigned: true,
  })
  sellingPrice: number;

  // 통계 속성
  @Column({
    unsigned: true,
    default: 0,
  })
  salesVolume: number;

  @Column({
    unsigned: true,
    default: 0,
  })
  reviewCount: number;

  @Column({
    unsigned: true,
    default: 0,
  })
  wishCount: number;

  // check 옵션
  @Column({
    default: 1,
  })
  display: boolean;

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

  @ManyToMany(() => Option, (option) => option.products)
  @JoinColumn()
  options: Option[];
}
