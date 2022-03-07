import { Variant } from '@/module/product';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { COLOR } from '../color.constant';

@Entity()
export class Color {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    length: COLOR.LABEL.MAX_LENGTH,
  })
  label: string;

  @Column({
    type: 'char',
    length: COLOR.HEX_CODE.MAX_LENGTH,
  })
  hexCode: string;

  // 연관 관계
  @OneToMany(() => Variant, (variant) => variant.color)
  variants: Variant[];
}
