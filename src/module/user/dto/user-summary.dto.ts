import { PickType } from '@nestjs/swagger';

import { User } from '../user.entity';

export class UserSummary extends PickType(User, [
  'id',
  'email',
  'name',
  'role',
  'provider',
  'snsId',
  'createdAt',
  'updatedAt',
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
