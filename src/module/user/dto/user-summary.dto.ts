import { OmitType } from '@nestjs/swagger';

import { User } from '../entity';

export class UserSummary extends OmitType(User, [
  'password',
  'refreshToken',
] as const) {
  constructor(user: User) {
    super();
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
    this.provider = user.provider;
    this.snsId = user.snsId;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
