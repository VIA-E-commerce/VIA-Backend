import { Exclude, Expose, plainToInstance } from 'class-transformer';

import { SwaggerDoc } from '@/common';

import { User } from '../entity';
import { SNSProvider, UserRole } from '../enum';
import { UserDoc } from './dto.doc';

@Exclude()
export class UserResponse {
  @SwaggerDoc.id('회원 식별자')
  @Expose()
  id: number;

  @UserDoc.email()
  @Expose()
  email: string;

  @UserDoc.name()
  @Expose()
  name: string;

  @UserDoc.role()
  @Expose()
  role: UserRole;

  @UserDoc.provider()
  @Expose()
  provider: SNSProvider;

  @UserDoc.snsId()
  @Expose()
  snsId: string;

  constructor(user: User) {
    Object.assign(this, plainToInstance(UserResponse, user));
  }
}
