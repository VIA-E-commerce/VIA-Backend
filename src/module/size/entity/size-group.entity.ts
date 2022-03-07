import { SizeValue } from '@/module/size/entity/size-value.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SIZE_GROUP } from '../size.constant';

@Entity()
export class SizeGroup {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    length: SIZE_GROUP.LABEL.MAX_LENGTH,
  })
  label: string;

  // 연관 관계
  @OneToMany(() => SizeValue, (sizeValue) => sizeValue.sizeGroup, {
    cascade: ['insert'],
  })
  values: SizeValue[];
}
