import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { User } from '@/module/user';

import { STRATEGY } from '../auth.constant';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { CONFIG } from '@/constant';
import { AuthConfig } from '@/config';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, STRATEGY.LOCAL) {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      usernameField: config.get<AuthConfig>(CONFIG.AUTH).usernameField,
    });
  }

  async validate(email: string, password: string): Promise<User> {
    return this.authService.validateLocalUser(email, password);
  }
}
