import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser, JwtAuthGuard, JwtAuthOrGuestGuard } from '@/module/auth';
import { User } from '@/module/user';

import {
  CreateQuestionRequest,
  EditQuestionRequest,
  QuestionIdParam,
  QuestionResponse,
} from './dto';
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

  @Doc.getQuestion('상품 문의 조회')
  @Get(':id')
  @UseGuards(JwtAuthOrGuestGuard)
  async getQuestion(
    @Param() { id }: QuestionIdParam,
    @CurrentUser() user: User,
  ): Promise<QuestionResponse> {
    return this.questionService.getQuestion(id, user);
  }

  @Doc.editQuestion('상품 문의 수정')
  @Patch(':id')
  async editQuestion(
    @Param() { id }: QuestionIdParam,
    @Body() dto: EditQuestionRequest,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.questionService.editQuestion(id, dto, user);
  }

  @Doc.removeQuestion('상품 문의 제거')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeQuestion(
    @Param() { id }: QuestionIdParam,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.questionService.removeQuestion(id, user);
  }
}
