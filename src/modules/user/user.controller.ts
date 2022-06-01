import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PagingQuery } from '@/common';
import { User } from '@/models';
import { CurrentUser, JwtAuthGuard } from '@/modules/auth';
import { ProductService, ReviewableProductQuery } from '@/modules/product';

import { UserResponse, EditUserRequest } from './dto';
import { UserControllerDoc as Doc } from './controller.doc';
import { UserService } from './user.service';

@ApiTags('회원 API')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @Doc.getMe('본인 정보 조회')
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: User) {
    return new UserResponse(user);
  }

  @Doc.editUserInfo('내 정보 수정')
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async editUserInfo(@Body() dto: EditUserRequest, @CurrentUser() user: User) {
    await this.userService.editUserInfo(dto, user);
  }

  @Doc.getMyWishlist('내 위시리스트 목록 조회')
  @Get('me/wishlist')
  @UseGuards(JwtAuthGuard)
  async getMyWishlist(
    @CurrentUser() user: User,
    @Query() { pageNum = 1, pageSize = 5 }: PagingQuery,
  ) {
    return this.userService.getMyWishlist(user, { pageNum, pageSize });
  }

  @Doc.getMyQuestions('내 문의 목록 조회')
  @Get('me/questions')
  @UseGuards(JwtAuthGuard)
  async getMyQuestions(
    @CurrentUser() user: User,
    @Query() { pageNum = 1, pageSize = 5 }: PagingQuery,
  ) {
    return this.userService.getMyQuestions(user, { pageNum, pageSize });
  }

  @Doc.getMyReviews('내 후기 목록 조회')
  @Get('me/reviews')
  @UseGuards(JwtAuthGuard)
  async getMyReviews(
    @CurrentUser() user: User,
    @Query() { pageNum = 1, pageSize = 5 }: PagingQuery,
  ) {
    return this.userService.getMyReviews(user, { pageNum, pageSize });
  }

  @Doc.getPurchasedProducts('내가 구매한 상품 목록 조회')
  @Get('me/products')
  @UseGuards(JwtAuthGuard)
  async getPurchasedProducts(
    @CurrentUser() user: User,
    @Query() { pageNum = 1, pageSize = 5, filter }: ReviewableProductQuery,
  ) {
    return this.productService.getPurchasedProducts(user, {
      pageNum,
      pageSize,
      filter,
    });
  }
}
