import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/module/user';

import { CreateCartDto } from './dto';
import { Cart } from './entity';
import { CART_ERROR } from './cart.constant';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async create({ variantId, ...rest }: CreateCartDto, user: User) {
    const newCart = await this.cartRepository.save(
      this.cartRepository.create({
        ...rest,
        user,
        variant: { id: variantId },
      }),
    );

    if (!newCart) {
      throw new HttpException(
        CART_ERROR.CREATE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
