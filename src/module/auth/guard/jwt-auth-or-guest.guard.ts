import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { STRATEGY } from '../auth.constant';

@Injectable()
export class JwtAuthOrGuestGuard extends AuthGuard([
  STRATEGY.JWT,
  STRATEGY.GUEST,
]) {}
