import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getPagination, Pagination, PagingQuery } from '@/common';
import { ERROR } from '@/docs';
import { User, UserRepository, Question, Review, Wishlist } from '@/models';
import { ProductCardResponse } from '@/module/product';
import { MyQuestionResponse } from '@/module/question';
import { MyReviewResponse } from '@/module/review';

import { EditUserRequest } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException(ERROR.USER.NOT_FOUND);
    }

    return user;
  }

  async editUserInfo({ name, phone }: EditUserRequest, user: User) {
    const result = await this.userRepository.update(user.id, {
      name,
      phone,
    });

    if (!result) {
      throw new HttpException(
        '회원 정보 수정 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMyWishlist(user: User, pagingQuery: PagingQuery) {
    const { pageNum, pageSize } = pagingQuery;

    const [wishlist, count] = await this.wishlistRepository.findAndCount({
      relations: ['product', 'product.images'],
      where: {
        user,
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    const products = wishlist.map(
      (item) => new ProductCardResponse(item.product, true),
    );

    return getPagination(products, count, pagingQuery);
  }

  async getMyQuestions(
    user: User,
    pagingQuery: PagingQuery,
  ): Promise<Pagination<MyQuestionResponse>> {
    const { pageNum, pageSize } = pagingQuery;

    const [myQuestions, count] = await this.questionRepository.findAndCount({
      relations: ['product', 'product.images', 'user'],
      where: {
        user,
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    const dtos = myQuestions.map((item) => new MyQuestionResponse(item, user));

    return getPagination(dtos, count, pagingQuery);
  }

  async getMyReviews(
    user: User,
    pagingQuery: PagingQuery,
  ): Promise<Pagination<MyReviewResponse>> {
    const { pageNum, pageSize } = pagingQuery;

    const [myReivews, count] = await this.reviewRepository.findAndCount({
      relations: ['user', 'product', 'product.images'],
      where: {
        user,
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    const dtos = myReivews.map((item) => new MyReviewResponse(item));

    return getPagination(dtos, count, pagingQuery);
  }
}
