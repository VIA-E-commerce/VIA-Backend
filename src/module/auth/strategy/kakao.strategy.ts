import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';

import { AuthConfig } from '@/config';
import { CONFIG } from '@/constant';
import { SNSProvider } from '@/module/user';

import { OAuthRequest } from '../dto';
import { STRATEGY } from '../auth.constant';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, STRATEGY.KAKAO) {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: config.get<AuthConfig>(CONFIG.AUTH).kakaoRestApiKey,
      clientSecret: config.get<AuthConfig>(CONFIG.AUTH).kakaoClientSecret,
      callbackURL: config.get<AuthConfig>(CONFIG.AUTH).kakaoCallbackUrl,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, username, _json } = profile;
    const { email } = _json.kakao_account;

    const oAuthRequest: OAuthRequest = {
      email,
      name: username,
      provider: SNSProvider.KAKAO,
      snsId: id,
    };

    const user = await this.authService.getOAuthUser(oAuthRequest);

    if (!user) {
      return this.authService.oAuthJoin(oAuthRequest);
    }

    return user;
  }
}
