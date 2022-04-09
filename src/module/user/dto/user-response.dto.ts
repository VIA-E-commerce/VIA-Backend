import { Exclude, Expose, plainToInstance } from 'class-transformer';

import { SwaggerDoc } from '@/common';
import { UserDoc } from '@/docs';
import { User, SNSProvider, UserRole } from '@/models';

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

  @UserDoc.phone()
  @Expose()
  phone: string;

  @UserDoc.role()
  @Expose()
  role: UserRole;

  @UserDoc.provider()
  @Expose()
  provider: SNSProvider;

  @UserDoc.snsId()
  @Expose()
  snsId: string;

  @SwaggerDoc.createdAt()
  @Expose()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  @Expose()
  updatedAt: Date;

  constructor(user: User) {
    Object.assign(this, plainToInstance(UserResponse, user));
  }
}
