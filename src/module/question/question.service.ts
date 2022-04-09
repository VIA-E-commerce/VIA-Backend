import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getPagination, Pagination, PagingQuery } from '@/common';
import { Question, User, UserRole } from '@/models';

import {
  CreateQuestionRequest,
  EditQuestionRequest,
  QuestionResponse,
} from './dto';
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

  async getQuestion(id: number, user: User): Promise<QuestionResponse> {
    const question = await this.questionRepository.findOne(id, {
      relations: ['user', 'product'],
    });

    if (!question) {
      throw new HttpException(QUESTION_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const isAuthorized = this.authPrivateQuestion(question, user);
    if (isAuthorized) {
      throw new HttpException(QUESTION_ERROR.FORBIDDEN, HttpStatus.FORBIDDEN);
    }

    return new QuestionResponse(question);
  }

  async editQuestion(id: number, dto: EditQuestionRequest, user: User) {
    const result = await this.questionRepository.update(
      {
        id,
        user,
      },
      dto,
    );

    if (result.affected === 0) {
      throw new HttpException(
        QUESTION_ERROR.UPDATE_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeQuestion(id: number, user: User): Promise<void> {
    const result = await this.questionRepository.delete({
      id,
      user,
    });

    if (result.affected === 0) {
      throw new HttpException(
        QUESTION_ERROR.DELETE_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getQuestionsByProductId(
    productId: number,
    { pageNum, pageSize }: PagingQuery,
    user: User,
  ): Promise<Pagination<QuestionResponse>> {
    const [questions, count] = await this.questionRepository.findAndCount({
      relations: ['user', 'product'],
      where: {
        product: {
          id: productId,
        },
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    const questionList = questions.map(
      (question) => new QuestionResponse(question, user),
    );

    return getPagination(questionList, count, { pageNum, pageSize });
  }

  private authPrivateQuestion(question: Question, user: User) {
    return (
      question.isPrivate &&
      question.user.id !== user.id &&
      user.role !== UserRole.ADMIN
    );
  }
}
