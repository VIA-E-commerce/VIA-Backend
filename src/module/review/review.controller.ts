import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser, JwtAuthGuard } from '@/module/auth';
import { User } from '@/module/user';

import { CreateReviewRequest } from './dto';
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
}
