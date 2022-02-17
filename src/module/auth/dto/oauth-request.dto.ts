import { PickType } from '@nestjs/swagger';

import { User } from '@/module/user';

export class OAuthRequest extends PickType(User, [
  'email',
  'name',
  'provider',
  'snsId',
] as const) {}
