import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ERROR } from '@/docs';
import { Cart, CartItem, CartRepository, User, Variant } from '@/models';

import {
  AddCartItemRequest,
  EditCartItemRequest,
  AddCartItemResponse,
  CartItemResponse,
} from './dto';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
  ) {}

  async addItem(
    { variantId, quantity }: AddCartItemRequest,
    user: User,
  ): Promise<AddCartItemResponse> {
    let cart = await this.cartRepository.findOne({ user });

    if (!cart) {
      cart = await this.cartRepository.save({
        user,
      });
    }

    // 이미 담겨있는 아이템인지 확인
    let cartItem = await this.cartItemRepository.findOne({
      where: {
        cart,
        variant: {
          id: variantId,
        },
      },
    });

    if (cartItem) {
      // 1) 이미 담겨있으면? 수량만 변경
      cartItem.quantity = quantity;
    } else {
      // 2) 새 아이템이면? 장바구니에 새로 등록
      cartItem = this.cartItemRepository.create({
        cart,
        quantity,
        variant: {
          id: variantId,
        },
      });
    }

    // 품목 재고 확인
    const variant = await this.variantRepository.findOne(variantId);

    let message: string | undefined = undefined;
    if (cartItem.quantity > variant.quantity) {
      message = `상품 재고가 부족하여 ${variant.quantity}개의 아이템만 추가됩니다.`;
    }

    // 장바구니 아이템 저장
    const result = await this.cartItemRepository.save(cartItem);

    if (!result) {
      throw new InternalServerErrorException(ERROR.CART.CREATE_ERROR);
    }

    return {
      id: result.id,
      message,
    };
  }

  async getCartItems(
    cartItemIds: number[],
    user: User,
  ): Promise<CartItemResponse[]> {
    const cart = await this.cartRepository.findAllByUserIdAndId(
      user.id,
      cartItemIds,
    );

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
      throw new ConflictException(ERROR.CART.VARIANT_CONFLICT);
    }

    const oldVariant = exCartItem.variant;
    const newVariant = await this.variantRepository.findOne({
      where: {
        id: variantId,
      },
    });

    // 3. 존재하지 않는 옵션이거나 다른 상품의 옵션인지 체크 ✅
    if (!newVariant || oldVariant.productId !== newVariant.productId) {
      throw new BadRequestException(ERROR.CART.NOT_SUPPORT_VARIANT);
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
      throw new ConflictException(ERROR.CART.OUT_OF_STOCK);
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
      throw new NotFoundException(ERROR.CART.UPDATE_ERROR);
    }
  }

  async removeItem(id: number, user: User) {
    const cart = await this.getUserCart(user);

    const result = await this.cartItemRepository.delete({
      id,
      cart,
    });

    this.checkCartExistence(result.affected > 0);
  }

  private async getUserCart(user: User) {
    const cart = await this.cartRepository.findOne({
      user,
    });

    this.checkCartExistence(!!cart);

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
      throw new NotFoundException(ERROR.CART.ITEM_NOT_FOUND);
    }

    return exCartItem;
  }

  private checkCartExistence(trueCondition: boolean) {
    if (!trueCondition) {
      throw new NotFoundException(ERROR.CART.NOT_FOUND);
    }
  }
}
