import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthConfig } from '@/config';
import { CONFIG } from '@/constant';
import { UserService } from '@/module/user';

import { JwtPayload } from '../interface';
import { STRATEGY } from '../auth.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, STRATEGY.JWT) {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<AuthConfig>(CONFIG.AUTH).accessTokenSecret,
    });
  }

  async validate(payload: JwtPayload) {
    return this.userService.getUserById(payload.id);
  }
}
