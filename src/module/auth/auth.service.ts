import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { User, UserRepository, UserRole } from '@/module/user';

import { JoinForm } from './dto';
import { AUTH, AUTH_ERROR } from './auth.constant';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
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
}
