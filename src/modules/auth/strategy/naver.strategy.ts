import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InternalOAuthError, Strategy } from 'passport-oauth2';

import { AuthConfig } from '@/configs';
import { CONFIG } from '@/constants';
import { SNSProvider } from '@/models';

import { OAuthRequest } from '../dto';
import { NaverProfile, NaverProfileResponse } from '../interface';
import { STRATEGY } from '../auth.constant';
import { AuthService } from '../auth.service';

const PROVIDER_NAME = 'naver';
const AUTHORIZATION_URL = 'https://nid.naver.com/oauth2.0/authorize';
const TOKEN_URL = 'https://nid.naver.com/oauth2.0/token';
const PROFILE_URL = 'https://openapi.naver.com/v1/nid/me';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, STRATEGY.NAVER) {
  public _profileURL: string;

  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      authorizationURL: AUTHORIZATION_URL,
      tokenURL: TOKEN_URL,
      clientID: config.get<AuthConfig>(CONFIG.AUTH).naverClientID,
      clientSecret: config.get<AuthConfig>(CONFIG.AUTH).naverClientSecret,
      callbackURL: config.get<AuthConfig>(CONFIG.AUTH).naverCallbackUrl,
    });

    this.name = PROVIDER_NAME;
    this._profileURL = PROFILE_URL;
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: NaverProfile,
  ) {
    const { id, name, email } = profile;

    const oAuthRequest: OAuthRequest = {
      email,
      name,
      provider: SNSProvider.NAVER,
      snsId: id,
    };

    const user = await this.authService.getOAuthUser(oAuthRequest);

    if (!user) {
      return this.authService.oAuthJoin(oAuthRequest);
    }

    return user;
  }

  authorizationParams(options: any): object {
    const params = {} as any;

    if (options.authType) {
      params.auth_type = options.authType;
    }

    return params;
  }

  userProfile(
    accessToken: string,
    done: (err?: Error, profile?: any) => void,
  ): void {
    this._oauth2.get(this._profileURL, accessToken, (err: any, body: any) => {
      if (err) {
        return done(
          new InternalOAuthError(
            '????????? ?????? ????????? ????????? ???????????? ???????????????.',
            err,
          ),
        );
      }

      try {
        const parsedBody: NaverProfileResponse = JSON.parse(body);

        const { resultcode, message, response } = parsedBody;

        if (!(resultcode && message)) {
          return done(
            new InternalOAuthError('API ?????? ??????(body)??? ??????????????????.', err),
          );
        }

        if (resultcode !== '00') {
          return done(
            new InternalOAuthError(
              '????????? Open API??? ????????? ??????????????????.',
              err,
            ),
          );
        }

        const {
          id,
          nickname,
          name,
          email,
          gender,
          age,
          birthday,
          profile_image: profileImage,
          birthyear,
          mobile,
          mobile_e164: mobileE164,
        } = response;

        const profile: NaverProfile = {
          provider: PROVIDER_NAME,
          id,
          nickname,
          name,
          email,
          gender,
          age,
          birthday,
          birthyear,
          mobile,
          profileImage,
          mobileE164,
          _raw: body,
          _json: parsedBody,
        };

        done(null, profile);
      } catch (err) {
        return done(new InternalOAuthError('', err));
      }
    });
  }
}
