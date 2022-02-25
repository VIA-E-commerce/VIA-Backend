import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { USER_ERROR } from './user.constant';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new HttpException(USER_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
