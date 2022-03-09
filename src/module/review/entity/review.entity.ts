import { CommonIdEntity } from '@/common';
import { Column, Entity, ManyToOne } from 'typeorm';

import { User } from '@/module/user';
import { Product } from '@/module/product';

import { REVIEW } from '../review.constant';

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
    default: 10,
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
  })
  product: Product;
}
