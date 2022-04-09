import { Column, Entity, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { REVIEW } from '../constants';

import { User } from './customer';
import { Product } from './product';

@Entity()
export class Review extends CommonIdEntity {
  @Column({
    length: REVIEW.CONTENT.MAX_LENGTH,
  })
  content: string;

  @Column({
    nullable: true,
  })
  imageUrl: string;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: REVIEW.RATING.MAX,
  })
  rating: number;

  // 연관 관계
  @ManyToOne(() => User, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;

  @ManyToOne(() => Product, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
    cascade: ['update'],
  })
  product: Product;
}
