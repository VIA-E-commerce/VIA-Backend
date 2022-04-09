import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { getPagination, Pagination, useTransaction } from '@/common';
import { ERROR } from '@/docs';
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
      throw err || new InternalServerErrorException(ERROR.REVIEW.CREATE_ERROR);
    }
  }

  async getReview(id: number): Promise<ReviewResponse> {
    const review = await this.reviewRepository.findOne(id, {
      relations: ['user'],
    });

    this.checkReivewExistence(!!review);

    return new ReviewResponse(review);
  }

  async editReview(id: number, dto: EditReviewRequest, user: User) {
    try {
      const result = await this.reviewRepository.update({ id, user }, dto);

      this.checkReivewExistence(result.affected > 0);
    } catch (err) {
      throw new InternalServerErrorException(ERROR.REVIEW.UPDATE_ERROR);
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

        this.checkReivewExistence(!!review);

        review.product.decreaseReviewCount();

        const result = await reviewRepository.delete(review.id);

        this.checkReivewExistence(result.affected > 0);

        await productRepository.save(review.product);
      });
    } catch (err) {
      throw new InternalServerErrorException(ERROR.REVIEW.DELETE_ERROR);
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

  private checkReivewExistence(trueCondition: boolean) {
    if (!trueCondition) {
      throw new NotFoundException(ERROR.REVIEW.NOT_FOUND);
    }
  }
}
