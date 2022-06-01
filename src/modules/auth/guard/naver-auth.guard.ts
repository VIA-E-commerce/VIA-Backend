import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { STRATEGY } from '../auth.constant';

@Injectable()
export class NaverAuthGuard extends AuthGuard(STRATEGY.NAVER) {}
