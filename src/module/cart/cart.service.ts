import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/module/user';

import { CreateCartRequest } from './dto';
import { Cart } from './entity';
import { CART_ERROR } from './cart.constant';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async create({ variantId, ...rest }: CreateCartRequest, user: User) {
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

  async remove(cartId: number, user: User) {
    const result = await this.cartRepository.delete({
      id: cartId,
      user,
    });

    if (result.affected <= 0) {
      throw new HttpException(
        CART_ERROR.DELETE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
