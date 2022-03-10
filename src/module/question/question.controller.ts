import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser, JwtAuthGuard } from '@/module/auth';
import { User } from '@/module/user';

import { CreateQuestionRequest } from './dto';
import { QuestionService } from './question.service';
import { QuestionControllerDoc as Doc } from './question.controller.doc';

@ApiTags('문의 API')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Doc.registerQuestion('상품 문의 등록')
  @Post()
  @UseGuards(JwtAuthGuard)
  async registerQuestion(
    @Body() dto: CreateQuestionRequest,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.questionService.registerQuestion(dto, user);
  }
}
