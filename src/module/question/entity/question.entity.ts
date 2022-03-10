import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { Product } from '@/module/product';
import { User } from '@/module/user';

import { QUESTION } from '../question.constant';

@Entity()
export class Question extends CommonIdEntity {
  @Column({
    length: QUESTION.TITLE.MAX_LENGTH,
  })
  title: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    default: false,
  })
  isPrivate: boolean;

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

  @RelationId((question: Question) => question.product)
  productId: number;
}
