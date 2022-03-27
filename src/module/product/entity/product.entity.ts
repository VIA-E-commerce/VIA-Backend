import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { Wishlist } from '@/module/wishlist';

import { PRODUCT } from '../product.constant';
import { Category } from './category.entity';
import { ProductImage } from './product-image.entity';
import { Variant } from './variant.entity';

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

  @OneToMany(() => Variant, (variant) => variant.product, {
    cascade: ['insert'],
  })
  variants: Variant[];

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: ['insert'],
  })
  images: ProductImage[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.product)
  wishlist?: Wishlist[];
}
