import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser, JwtAuthGuard } from '@/module/auth';

import { UserResponse } from './dto';
import { User } from './entity';
import { UserControllerDoc as Doc } from './controller.doc';

@ApiTags('회원 API')
@Controller('users')
export class UserController {
  @Doc.getMe('본인 정보 조회')
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: User) {
    return new UserResponse(user);
  }
}
