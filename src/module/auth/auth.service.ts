import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { handleException, throwExceptionOrNot } from '@/common';
import { CONFIG } from '@/constant';
import { AuthConfig } from '@/config';
import { EXCEPTION } from '@/docs';
import { User, UserRole, UserRepository } from '@/models';

import { JoinForm, OAuthRequest } from './dto';
import { JwtPayload } from './interface';
import { AUTH } from './auth.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async join(joinForm: JoinForm): Promise<void> {
    const { email, password, name, phone } = joinForm;

    const exUser: User = await this.userRepository.findOne(
      { email },
      {
        withDeleted: true,
      },
    );

    throwExceptionOrNot(exUser, EXCEPTION.AUTH.DUPLICATE_EMAIL);

    try {
      await this.userRepository.insert(
        this.userRepository.create({
          email,
          password: await bcrypt.hash(password, AUTH.SALT),
          name,
          phone,
          role: UserRole.USER,
        }),
      );
    } catch (err) {
      handleException(EXCEPTION.AUTH.JOIN_ERROR);
    }
  }

  async deleteAccount(user: User) {
    await this.userRepository.softDelete(user.id);
  }

  async removeRefreshToken(userId: number) {
    this.userRepository.update(userId, { refreshToken: null });
  }

  async validateLocalUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findWithPassword(email);
    throwExceptionOrNot(user, EXCEPTION.AUTH.BAD_AUTH_REQUEST);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    delete user.password;

    throwExceptionOrNot(isPasswordValid, EXCEPTION.AUTH.BAD_AUTH_REQUEST);

    return user;
  }

  async getUserIfRefreshTokenMatches(id: number, refreshToken: string) {
    const user = await this.userRepository.findWithRefreshToken(id);
    throwExceptionOrNot(user, EXCEPTION.AUTH.BAD_AUTH_REQUEST);

    const doesRefreshTokenMatch = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    throwExceptionOrNot(doesRefreshTokenMatch, EXCEPTION.AUTH.BAD_AUTH_REQUEST);
    delete user.refreshToken;

    return user;
  }

  generateAccessToken({ id }: JwtPayload): string {
    const payload: JwtPayload = { id };

    return this.jwtService.sign(payload, {
      secret: this.config.get<AuthConfig>(CONFIG.AUTH).accessTokenSecret,
      expiresIn: this.config.get<AuthConfig>(CONFIG.AUTH).accessTokenExp,
    });
  }

  async generateRefreshToken({ id }: JwtPayload): Promise<string> {
    const payload: JwtPayload = { id };

    try {
      const refreshToken = this.jwtService.sign(payload, {
        secret: this.config.get<AuthConfig>(CONFIG.AUTH).refreshTokenSecret,
        expiresIn: this.config.get<AuthConfig>(CONFIG.AUTH).refreshTokenExp,
      });

      const hashedRefreshToken = await bcrypt.hash(refreshToken, AUTH.SALT);

      const result = await this.userRepository.update(id, {
        refreshToken: hashedRefreshToken,
      });

      throwExceptionOrNot(result.affected, EXCEPTION.AUTH.REFRESH_FAILURE);

      return refreshToken;
    } catch (err) {
      handleException(EXCEPTION.AUTH.JWT_ERROR);
    }
  }

  async getOAuthUser(oAuthRequest: OAuthRequest): Promise<User> {
    // 1. DB에서 email로 가입 여부를 확인합니다.
    const exUser: User = await this.userRepository.findOne({
      email: oAuthRequest.email,
    });

    // 2. 가입되어 있지 않으면 null을 반환합니다.
    if (!exUser) return null;

    // 3. DB에 저장된 유저의 SNS 정보와 Request의 SNS 정보가 다르면 예외를 던집니다.
    this.checkOAuthInfo(exUser, oAuthRequest);

    return exUser;
  }

  private checkOAuthInfo(user: User, { provider, snsId }: OAuthRequest) {
    throwExceptionOrNot(
      user.provider === provider && user.snsId == snsId,
      EXCEPTION.AUTH.MISMATCHED_SNS_INFO,
    );
  }

  async oAuthJoin(oAuthRequest: OAuthRequest): Promise<User> {
    try {
      return this.userRepository.save(this.userRepository.create(oAuthRequest));
    } catch (err) {
      handleException(EXCEPTION.AUTH.JOIN_ERROR);
    }
  }
}
