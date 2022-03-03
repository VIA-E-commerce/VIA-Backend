import { Column, Entity, Index } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { UserRole, SNSProvider } from '../enum';
import { USER } from '../user.constant';

@Index('email', ['email'], { unique: true })
@Entity()
export class User extends CommonIdEntity {
  @Column({
    unique: true,
    length: USER.EMAIL.MAX_LENGTH,
  })
  email: string;

  @Column({
    length: USER.PASSWORD.MAX_LENGTH,
    nullable: true,
    select: false,
  })
  password: string;

  @Column({
    length: USER.NAME.MAX_LENGTH,
  })
  name: string;

  @Column({
    type: 'char',
    length: USER.ROLE.MAX_LENGTH,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    length: USER.PROVIDER.MAX_LENGTH,
    default: SNSProvider.LOCAL,
  })
  provider: SNSProvider;

  @Column({
    nullable: true,
  })
  snsId: string;

  @Column({
    nullable: true,
    select: false,
  })
  refreshToken: string;
}
