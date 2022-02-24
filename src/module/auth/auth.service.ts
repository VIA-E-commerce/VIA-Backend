import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CONFIG } from '@/constant';
import { AuthConfig } from '@/config';
import { User, UserRepository, UserRole } from '@/module/user';

import { JoinForm, OAuthRequest } from './dto';
import { AUTH, AUTH_ERROR } from './auth.constant';
import { JwtPayload } from './interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async join(joinForm: JoinForm): Promise<void> {
    const { email, password, name } = joinForm;

    const exUser: User = await this.userRepository.findOne({ email });

    if (exUser) {
      throw new HttpException(
        AUTH_ERROR.DUPLICATE_EMAIL,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.userRepository.save(
        this.userRepository.create({
          email,
          password: await bcrypt.hash(password, AUTH.SALT),
          name,
          role: UserRole.USER,
        }),
      );
    } catch (err) {
      throw new HttpException(
        AUTH_ERROR.JOIN_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateLocalUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findWithPassword(email);

    if (!user) {
      throw new HttpException(
        AUTH_ERROR.BAD_LOGIN_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    delete user.password;

    if (!isPasswordValid) {
      throw new HttpException(
        AUTH_ERROR.BAD_LOGIN_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async validateJwtUser(id: number) {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new HttpException(AUTH_ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

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
        secret: this.config.get<AuthConfig>(CONFIG.AUTH).accessTokenSecret,
        expiresIn: this.config.get<AuthConfig>(CONFIG.AUTH).accessTokenExp,
      });

      const result = await this.userRepository.update(id, {
        refreshToken,
      });

      if (result.affected === 0) {
        throw new Error();
      }

      return refreshToken;
    } catch (err) {
      throw new HttpException(
        AUTH_ERROR.JWT_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
    console.log(typeof user.snsId, typeof snsId);
    if (user.provider !== provider || user.snsId != snsId) {
      throw new HttpException(
        AUTH_ERROR.MISMATCHED_SNS_INFO,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async oAuthJoin(oAuthRequest: OAuthRequest): Promise<User> {
    try {
      return this.userRepository.save(this.userRepository.create(oAuthRequest));
    } catch (err) {
      throw new HttpException(
        AUTH_ERROR.JOIN_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}