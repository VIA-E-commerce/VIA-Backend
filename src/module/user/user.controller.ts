import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PagingQuery } from '@/common';
import { CurrentUser, JwtAuthGuard } from '@/module/auth';

import { UserResponse } from './dto';
import { User } from './entity';
import { UserControllerDoc as Doc } from './controller.doc';
import { UserService } from './user.service';

@ApiTags('회원 API')
@Controller('users')
export class UserController {
  constructor(private readonly userSerivce: UserService) {}

  @Doc.getMe('본인 정보 조회')
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: User) {
    return new UserResponse(user);
  }

  @Doc.getMyWishlist('내 위시리스트 목록 조회')
  @Get('me/wishlist')
  @UseGuards(JwtAuthGuard)
  async getMyWishlist(
    @CurrentUser() user: User,
    @Query() { pageNum = 1, pageSize = 5 }: PagingQuery,
  ) {
    return this.userSerivce.getMyWishlist(user, { pageNum, pageSize });
  }
}
