import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { CookieOptions, Response } from 'express';

import { AuthConfig } from '@/config';
import { CONFIG, COOKIE } from '@/constant';
import { User } from '@/module/user';

import { CurrentUser } from './decorator';
import { JoinForm, LoginResponse } from './dto';
import {
  LocalAuthGuard,
  KakaoAuthGuard,
  NaverAuthGuard,
  JwtRefreshAuthGuard,
} from './guard';
import { JwtPayload } from './interface';
import { AuthService } from './auth.service';
import { Docs } from './auth.docs';

@ApiTags('인증/인가 API')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Docs.join('회원가입')
  @Post('join')
  async join(@Body() joinForm: JoinForm): Promise<void> {
    await this.authService.join(joinForm);
  }

  @Docs.login('로그인')
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    return this.issueTokens(user, res);
  }

  @Docs.kakao('카카오 회원가입/로그인')
  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  kakao(): void {
    // 카카오 아이디로 로그인
  }

  @Docs.kakaoCallback('카카오 OAuth 콜백')
  @Get('kakao/oauth')
  @UseGuards(KakaoAuthGuard)
  async kakaoCallback(@CurrentUser() user: User, @Res() res: Response) {
    await this.oAuthLogin(user, res);
  }

  @Docs.naver('네이버 회원가입/로그인')
  @Get('naver')
  @UseGuards(NaverAuthGuard)
  naver(): void {
    // 네이버 아이디로 로그인
  }

  @Docs.naverCallback('네이버 OAuth 콜백')
  @Get('naver/oauth')
  @UseGuards(NaverAuthGuard)
  async naverCallback(@CurrentUser() user: User, @Res() res: Response) {
    await this.oAuthLogin(user, res);
  }

  @Docs.refresh('Access 토큰 갱신')
  @Get('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  refresh(@CurrentUser() user: User): LoginResponse {
    const jwtPayload: JwtPayload = { id: user.id };
    const accessToken = this.authService.generateAccessToken(jwtPayload);

    return {
      accessToken,
    };
  }

  private async setRefreshTokenCookie(payload: JwtPayload, res: Response) {
    const refreshToken = await this.authService.generateRefreshToken(payload);
    const cookieOptions: CookieOptions = {
      path: '/',
      maxAge: this.config.get<AuthConfig>(CONFIG.AUTH).refreshTokenExp * 1000,
      httpOnly: true,
      signed: true,
      secure:
        this.config.get(CONFIG.ENV_KEY.NODE_ENV) !==
        CONFIG.NODE_ENV.DEVELOPMENT,
    };

    res.cookie(COOKIE.REFRESH_TOKEN, refreshToken, cookieOptions);
  }

  private async issueTokens(user: User, res: Response): Promise<LoginResponse> {
    const jwtPayload: JwtPayload = { id: user.id };
    const accessToken = this.authService.generateAccessToken(jwtPayload);
    await this.setRefreshTokenCookie(jwtPayload, res);

    return {
      accessToken,
    };
  }

  private async oAuthLogin(user: User, res: Response) {
    const { accessToken } = await this.issueTokens(user, res);

    const oAuthLoginRedirect = `${
      this.config.get<AuthConfig>(CONFIG.AUTH).oAuthRedirectUrl
    }?token=${accessToken}`;

    res.redirect(oAuthLoginRedirect);
  }
}
