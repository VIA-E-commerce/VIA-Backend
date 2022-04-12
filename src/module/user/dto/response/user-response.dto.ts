import { Exclude, Expose, plainToInstance } from 'class-transformer';

import { SwaggerDoc } from '@/common';
import { User, SNSProvider, UserRole } from '@/models';

import { UserResponseDec } from '../decorator';

@Exclude()
export class UserResponse {
  @UserResponseDec.userId()
  @Expose()
  id: number;

  @UserResponseDec.email()
  @Expose()
  email: string;

  @UserResponseDec.name()
  @Expose()
  name: string;

  @UserResponseDec.phone()
  @Expose()
  phone: string;

  @UserResponseDec.role()
  @Expose()
  role: UserRole;

  @UserResponseDec.provider()
  @Expose()
  provider: SNSProvider;

  @UserResponseDec.snsId()
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
