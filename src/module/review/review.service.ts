import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/module/user';

import { CreateReviewRequest } from './dto';
import { Review as Review } from './entity';
import { REVIEW_ERROR } from './review.constant';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async addReview(
    { content, imageUrl, rating, productId }: CreateReviewRequest,
    user: User,
  ): Promise<void> {
    try {
      await this.reviewRepository.save(
        this.reviewRepository.create({
          content,
          imageUrl,
          rating,
          product: { id: productId },
          user,
        }),
      );
    } catch (err) {
      throw new HttpException(
        REVIEW_ERROR.CREATE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number, user: User) {
    try {
      const result = await this.reviewRepository.delete({
        id,
        user,
      });

      if (result.affected <= 0) {
        throw new HttpException(REVIEW_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    } catch (err) {
      throw new HttpException(
        REVIEW_ERROR.DELETE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
