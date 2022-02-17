import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { COOKIE } from '@/constant';
import { User } from '@/module/user';

import { CurrentUser } from './decorator';
import { JoinForm, LoginResponse } from './dto';
import { LocalAuthGuard } from './guard';
import { JwtPayload } from './interface';
import { AuthService } from './auth.service';
import { Docs } from './auth.docs';

@ApiTags('인증/인가 API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    const jwtPayload: JwtPayload = { id: user.id };

    const accessToken = this.authService.generateAccessToken(jwtPayload);
    await this.setRefreshTokenCookie(jwtPayload, res);

    return { accessToken };
  }

  private async setRefreshTokenCookie(payload: JwtPayload, res: Response) {
    const refreshToken = await this.authService.generateRefreshToken(payload);
    res.cookie(COOKIE.REFRESH_TOKEN, refreshToken);
  }
}
