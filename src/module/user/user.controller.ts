import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser, JwtAuthGuard } from '@/module/auth';

import { UserSummary } from './dto';
import { User } from './entity';

@ApiTags('회원 API')
@Controller('users')
export class UserController {
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User) {
    return new UserSummary(user);
  }
}
