import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { getPagination, Pagination, useTransaction } from '@/common';
import { User } from '@/module/user';

import {
  CreateReviewRequest,
  EditReviewRequest,
  ReviewResponse,
  ReviewListQuery,
} from './dto';
import { Review as Review } from './entity';
import { ReviewSort } from './enum';
import { REVIEW_ERROR } from './review.constant';
import { Product } from '@/module/product';

@Injectable()
export class ReviewService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async addReview(
    { content, imageUrl, rating, productId }: CreateReviewRequest,
    user: User,
  ): Promise<void> {
    try {
      await useTransaction(this.connection, async (manager) => {
        const productRepository = manager.getRepository(Product);
        const reviewRepository = manager.getRepository(Review);

        const product = await productRepository.findOne(productId);

        if (!product) {
          throw new HttpException(
            '상품을 찾을 수 없습니다.',
            HttpStatus.NOT_FOUND,
          );
        }

        product.increaseReviewCount();

        await reviewRepository.save(
          reviewRepository.create({
            content,
            imageUrl,
            rating,
            product,
            user,
          }),
        );
      });
    } catch (err) {
      throw (
        err ||
        new HttpException(
          REVIEW_ERROR.CREATE_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      );
    }
  }

  async getReview(id: number): Promise<ReviewResponse> {
    const review = await this.reviewRepository.findOne(id, {
      relations: ['user'],
    });

    this.checkReivewExistence(review);

    return new ReviewResponse(review);
  }

  async editReview(id: number, dto: EditReviewRequest, user: User) {
    try {
      const result = await this.reviewRepository.update({ id, user }, dto);

      if (result.affected <= 0) {
        throw new HttpException(REVIEW_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    } catch (err) {
      throw new HttpException(
        REVIEW_ERROR.UPDATE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeReview(id: number, user: User) {
    try {
      await useTransaction(this.connection, async (manager) => {
        const reviewRepository = manager.getRepository(Review);
        const productRepository = manager.getRepository(Product);

        const review = await reviewRepository.findOne({
          relations: ['product'],
          where: {
            id,
            user,
          },
        });

        this.checkReivewExistence(review);

        review.product.decreaseReviewCount();

        const result = await reviewRepository.delete(review.id);

        if (result.affected <= 0) {
          throw new HttpException(REVIEW_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        await productRepository.save(review.product);
      });
    } catch (err) {
      throw new HttpException(
        REVIEW_ERROR.DELETE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getReviewsByProductId(
    productId: number,
    { pageNum, pageSize, sort }: ReviewListQuery,
  ): Promise<Pagination<ReviewResponse>> {
    let order: Record<string, 'ASC' | 'DESC'> = {
      createdAt: 'DESC',
    };

    switch (sort) {
      case ReviewSort.RATING_DESC:
        order = {
          rating: 'DESC',
          createdAt: 'DESC',
        };
        break;
      case ReviewSort.RATING_ASC:
        order = {
          rating: 'ASC',
          createdAt: 'DESC',
        };
        break;
    }

    const [reviews, count] = await this.reviewRepository.findAndCount({
      relations: ['user'],
      where: {
        product: {
          id: productId,
        },
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order,
    });

    const reviewList = reviews.map((review) => new ReviewResponse(review));
    return getPagination(reviewList, count, { pageNum, pageSize });
  }

  private checkReivewExistence(review: Review) {
    if (!review) {
      throw new HttpException(REVIEW_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
