import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User, UserRepository, UserRole } from '@/module/user';

import { JoinForm } from './dto';
import { AUTH, AUTH_ERROR } from './auth.constant';
import { CONFIG } from '@/constant';
import { AuthConfig } from '@/config';
import { JwtPayload } from './interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async join(joinForm: JoinForm): Promise<void> {
    const { email, password, name, mobile } = joinForm;

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
          mobile,
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

  generateAccessToken({ id }: JwtPayload): string {
    const payload: JwtPayload = { id };

    return this.jwtService.sign(payload, {
      secret: this.config.get<AuthConfig>(CONFIG.AUTH).accessTokenSecret,
      expiresIn: this.config.get<AuthConfig>(CONFIG.AUTH).accessTokenExp,
    });
  }
}
