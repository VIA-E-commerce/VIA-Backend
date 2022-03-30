import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getPagination, PagingQuery } from '@/common';
import { ProductCardResponse, Wishlist } from '@/module/product';

import { User } from './entity';
import { USER_ERROR } from './user.constant';
import { UserRepository } from './user.repository';
import { EditUserRequest } from '@/module/user/dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new HttpException(USER_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
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
}
