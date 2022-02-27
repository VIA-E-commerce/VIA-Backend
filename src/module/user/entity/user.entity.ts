import { Entity, Index } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { UserRole, SNSProvider } from '../enum';
import { UserMetaInfo as MetaInfo } from './user.meta-info';

@Index('email', ['email'], { unique: true })
@Entity()
export class User extends CommonIdEntity {
  @MetaInfo.email()
  email: string;

  @MetaInfo.password()
  password: string;

  @MetaInfo.name()
  name: string;

  @MetaInfo.role()
  role: UserRole;

  @MetaInfo.provider()
  provider: SNSProvider;

  @MetaInfo.snsId()
  snsId: string;

  @MetaInfo.refreshToken()
  refreshToken: string;
}
