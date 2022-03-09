import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser, JwtAuthGuard } from '@/module/auth';
import { User } from '@/module/user';

import { CreateReviewRequest, EditReviewRequest, ReviewIdParam } from './dto';
import { ReviewService } from './review.service';
import { ReviewControllerDoc as Doc } from './review.controller.doc';

@ApiTags('리뷰 API')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Doc.addReview('리뷰 등록')
  @Post()
  @UseGuards(JwtAuthGuard)
  async addReview(
    @Body() dto: CreateReviewRequest,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.reviewService.addReview(dto, user);
  }

  @Doc.editReview('리뷰 수정')
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async editReview(
    @Param() { id }: ReviewIdParam,
    @Body() dto: EditReviewRequest,
    @CurrentUser() user: User,
  ) {
    await this.reviewService.editReview(id, dto, user);
  }

  @Doc.removeReview('리뷰 삭제')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeReview(
    @Param() { id }: ReviewIdParam,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.reviewService.removeReview(id, user);
  }
}
