import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/module/user';

import { CreateQuestionRequest } from './dto';
import { Question } from './entity';
import { QUESTION_ERROR } from './question.constant';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async registerQuestion(
    { title, content, isPrivate, productId }: CreateQuestionRequest,
    user: User,
  ): Promise<void> {
    const newQuestion = await this.questionRepository.save(
      this.questionRepository.create({
        title,
        content,
        isPrivate,
        product: { id: productId },
        user,
      }),
    );

    if (!newQuestion) {
      throw new HttpException(
        QUESTION_ERROR.CREATE_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeQuestion(id: number, user: User): Promise<void> {
    const result = await this.questionRepository.delete({
      id,
      user,
    });

    if (!result) {
      throw new HttpException(
        QUESTION_ERROR.DELETE_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
