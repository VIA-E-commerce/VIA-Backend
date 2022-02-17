import { STRATEGY } from '@/module/auth/auth.constant';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard(STRATEGY.LOCAL) {}
