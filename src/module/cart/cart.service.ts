import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Variant } from '@/module/product';
import { User } from '@/module/user';

import {
  AddCartItemRequest,
  EditCartItemRequest,
  CartItemResponse,
} from './dto';
import { Cart, CartItem } from './entity';
import { CART_ERROR } from './cart.constant';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
  ) {}

  async addItem({ variantId, quantity }: AddCartItemRequest, user: User) {
    let cart = await this.cartRepository.findOne({ user });

    if (!cart) {
      cart = await this.cartRepository.save({
        user,
      });
    }

    const result = await this.cartItemRepository.save({
      quantity,
      cart,
      variant: {
        id: variantId,
      },
    });

    if (!result) {
      throw new HttpException(
        CART_ERROR.CREATE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMyCartItems(user: User): Promise<CartItemResponse[]> {
    const cart = await this.cartRepository.findByUserId(user.id);

    if (!cart || !cart.items) return [];

    return cart.items.map((cartItem) => new CartItemResponse(cartItem));
  }

  async editVariant(cartItemId: number, variantId: number, user: User) {
    const cart = await this.getUserCart(user);

    // 1. 회원의 장바구니에 변경할 아이템이 있는지 체크 ✅
    const exCartItem = await this.getCartItem(cartItemId, cart);

    // 2. 장바구니에 변경하려는 품목과 중복되는 아이템이 있는지 체크 ✅
    const duplicateCartItem = await this.cartItemRepository.findOne({
      relations: ['variant'],
      where: {
        cart,
        variant: {
          id: variantId,
        },
      },
    });
    if (duplicateCartItem) {
      throw new HttpException(CART_ERROR.VARIANT_CONFLICT, HttpStatus.CONFLICT);
    }

    const oldVariant = exCartItem.variant;
    const newVariant = await this.variantRepository.findOne({
      where: {
        id: variantId,
      },
    });

    // 3. 존재하지 않는 옵션이거나 다른 상품의 옵션인지 체크 ✅
    if (!newVariant || oldVariant.productId !== newVariant.productId) {
      throw new HttpException(
        CART_ERROR.NOT_SUPPORT_VARIANT,
        HttpStatus.BAD_REQUEST,
      );
    }

    // 4. 장바구니 아이템 옵션 업데이트
    await this.cartItemRepository.update(cartItemId, {
      variant: newVariant,
    });
  }

  async editItem(
    cartItemId: number,
    { quantity }: EditCartItemRequest,
    user: User,
  ) {
    const cart = await this.getUserCart(user);

    // 1. 회원의 장바구니에 변경할 아이템이 있는지 체크 ✅
    const exCartItem = await this.getCartItem(cartItemId, cart);

    // 2. 구매 제한 재고 수량 체크 ✅
    const maxQuantity = exCartItem.variant.quantity;
    if (quantity > maxQuantity) {
      throw new HttpException(CART_ERROR.OUT_OF_STOCK, HttpStatus.CONFLICT);
    }

    // 3. 장바구니 아이템 데이터 업데이트
    const result = await this.cartItemRepository.update(
      {
        id: cartItemId,
        cart,
      },
      {
        quantity,
      },
    );

    // 4. 업데이트된 레코드 유무 체크 ✅
    if (result.affected <= 0) {
      throw new HttpException(CART_ERROR.UPDATE_ERROR, HttpStatus.NOT_FOUND);
    }
  }

  async removeItem(id: number, user: User) {
    const cart = await this.getUserCart(user);

    const result = await this.cartItemRepository.delete({
      id,
      cart,
    });

    if (result.affected <= 0) {
      throw new HttpException(CART_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  private async getUserCart(user: User) {
    const cart = await this.cartRepository.findOne({
      user,
    });

    if (!cart) {
      throw new HttpException(CART_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return cart;
  }

  private async getCartItem(cartItemId: number, cart: Cart) {
    const exCartItem = await this.cartItemRepository.findOne(cartItemId, {
      relations: ['variant'],
      where: {
        cart,
      },
    });

    if (!exCartItem) {
      throw new HttpException(CART_ERROR.ITEM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return exCartItem;
  }
}
