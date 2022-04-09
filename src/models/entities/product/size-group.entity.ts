import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SIZE_GROUP } from '../../constants';

import { SizeValue } from './size-value.entity';

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
