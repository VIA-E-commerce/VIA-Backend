import { Controller, Get, UseGuards } from '@nestjs/common';

import { CurrentUser, JwtAuthGuard } from '@/module/auth';

import { UserSummary } from './dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User) {
    return new UserSummary(user);
  }
}
