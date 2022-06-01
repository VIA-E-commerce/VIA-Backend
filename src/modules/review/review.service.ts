import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import {
  getPagination,
  handleException,
  Pagination,
  throwExceptionOrNot,
  useTransaction,
} from '@/common';
import { EXCEPTION } from '@/docs';
import { User, Product, Review } from '@/models';

import {
  CreateReviewRequest,
  EditReviewRequest,
  ReviewResponse,
  ReviewListQuery,
} from './dto';
import { ReviewSort } from './enum';

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
        throwExceptionOrNot(product, EXCEPTION.PRODUCT.NOT_FOUND);

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
      handleException(EXCEPTION.REVIEW.CREATE_ERROR, err);
    }
  }

  async getReview(id: number): Promise<ReviewResponse> {
    const review = await this.reviewRepository.findOne(id, {
      relations: ['user'],
    });

    throwExceptionOrNot(review, EXCEPTION.REVIEW.NOT_FOUND);

    return new ReviewResponse(review);
  }

  async editReview(id: number, dto: EditReviewRequest, user: User) {
    const result = await this.reviewRepository.update({ id, user }, dto);
    throwExceptionOrNot(result.affected, EXCEPTION.REVIEW.UPDATE_ERROR);
  }

  async removeReview(id: number, user: User) {
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

      throwExceptionOrNot(review, EXCEPTION.REVIEW.NOT_FOUND);

      review.product.decreaseReviewCount();

      const result = await reviewRepository.delete(review.id);

      throwExceptionOrNot(result.affected, EXCEPTION.REVIEW.DELETE_ERROR);

      await productRepository.save(review.product);
    });
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
}
