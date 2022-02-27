import { CommonEntity } from '@/common';
import { Entity, Index } from 'typeorm';

import { UserRole, SNSProvider } from '../enum';
import { UserDocs } from './user.entity.docs';

@Index('email', ['email'], { unique: true })
@Entity()
export class User extends CommonEntity {
  @UserDocs.id()
  id: number;

  @UserDocs.email()
  email: string;

  @UserDocs.password()
  password: string;

  @UserDocs.name()
  name: string;

  @UserDocs.role()
  role: UserRole;

  @UserDocs.provider()
  provider: SNSProvider;

  @UserDocs.snsId()
  snsId: string;

  @UserDocs.refreshToken()
  refreshToken: string;
}
