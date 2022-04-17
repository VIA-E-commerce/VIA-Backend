import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import {
  checkExistence,
  getPagination,
  Pagination,
  useTransaction,
} from '@/common';
import { ERROR } from '@/docs';
import {
  User,
  Product,
  Wishlist,
  ProductRepository,
  CategoryRepository,
  ColorRepository,
  SizeValueRepository,
  WishlistRepository,
  ProductFilterOptions,
} from '@/models';

import {
  ProductListQuery,
  ProductCardResponse,
  ProductDetailResponse,
  ReviewableProductQuery,
  PurchasedProductResponse,
} from './dto';
import { PurchasedProductFilter } from './enum';

@Injectable()
export class ProductService {
  constructor(
    private readonly connection: Connection,
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly colorRepository: ColorRepository,
    private readonly sizeValueRepository: SizeValueRepository,
    private readonly wishlistRepository: WishlistRepository,
  ) {}

  async getAll(
    { pageNum, pageSize, category, sort }: ProductListQuery,
    user: User,
  ): Promise<Pagination<ProductCardResponse>> {
    const productFilterOptions: ProductFilterOptions = {};

    // 유효한 카테고리인지 확인
    if (category === 'sale') {
      productFilterOptions.discount = true;
    } else if (category === 'new') {
      productFilterOptions.thisMonth = true;
    } else if (category) {
      const dbCategory = await this.categoryRepository.findByCode(category);
      this.checkCategoryExistence(!!dbCategory);

      productFilterOptions.category = category;
    }

    // 상품 목록 조회 (+ 페이지네이션)
    const [products, count] = await this.productRepository.getAllAndCount(
      { pageNum, pageSize },
      sort,
      productFilterOptions,
    );

    const responseData = await Promise.all(
      products.map(async (item) => {
        // 품절 여부 검사
        const isSoldOut = await this.productRepository.isProductSoldOut(
          item.id,
        );

        // 위시리스트 추가 여부 검사
        const wished = await this.wishlistRepository.isProductWished(
          item.id,
          user,
        );

        return new ProductCardResponse(item, wished, isSoldOut);
      }),
    );

    return getPagination(responseData, count, { pageNum, pageSize });
  }

  async getOne(productId: number, user: User): Promise<ProductDetailResponse> {
    const [productAlias, productImageAlias, variantAlias] = [
      'product',
      'image',
      'variant',
      'wishlist',
    ];

    const product = await this.productRepository
      .createQueryBuilder(productAlias)
      .leftJoinAndSelect(`${productAlias}.images`, productImageAlias)
      .where(`${productAlias}.id = :productId`, { productId })
      .leftJoinAndSelect(
        `${productAlias}.variants`,
        variantAlias,
        `${variantAlias}.product.id = ${productAlias}.id AND ${variantAlias}.hide = false`,
      )
      .orderBy(`${productImageAlias}.order`, 'ASC')
      .getOne();

    this.checkProductExistence(!!product);

    // 위시리스트 추가 여부 검사
    const wished = await this.wishlistRepository.isProductWished(
      productId,
      user,
    );

    const colors = await this.colorRepository.findByProductId(productId);
    const sizeValues = await this.sizeValueRepository.findByProductId(
      productId,
    );

    // 품절 여부 검사
    const isSoldOut = await this.productRepository.isProductSoldOut(productId);

    return new ProductDetailResponse(
      product,
      colors,
      sizeValues,
      wished,
      isSoldOut,
    );
  }

  async addToWishlist(productId: number, user: User) {
    await useTransaction(this.connection, async (manager) => {
      const wishlistRepository = manager.getRepository(Wishlist);
      const productRepository = manager.getRepository(Product);

      const product = await this.productRepository.findOne(productId);

      this.checkProductExistence(!!product);

      const result = await wishlistRepository.insert({
        product: { id: productId },
        user,
      });

      if (result.raw === 0) {
        throw new HttpException(
          '위시리스트에 상품 추가 중 오류가 발생했습니다.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      product.increaseWishCount();
      await productRepository.save(product);
    });
  }

  async removeFromWishlist(productId: number, user: User) {
    await useTransaction(this.connection, async (manager) => {
      const wishlistRepository = manager.getRepository(Wishlist);
      const productRepository = manager.getRepository(Product);

      const product = await productRepository.findOne(productId);

      this.checkProductExistence(!!product);

      const result = await wishlistRepository.delete({
        product: {
          id: productId,
        },
        user,
      });

      if (result.affected === 0) {
        throw new HttpException(
          '위시리스트에서 상품 제거 중 오류가 발생했습니다.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      product.descreaseWishCount();
      await productRepository.save(product);
    });
  }

  async getPurchasedProducts(
    user: User,
    { pageNum, pageSize, filter }: ReviewableProductQuery,
  ) {
    const [
      productAlias,
      productImageAlias,
      variantAlias,
      orderDetailAlias,
      orderAlias,
      reviewAlias,
    ] = [
      'product',
      'productImage',
      'variant',
      'orderDetail',
      'order',
      'review',
    ];

    // Query : 구매한 상품 조회
    let productsQuery = this.productRepository
      .createQueryBuilder(productAlias)
      .innerJoin(`${productAlias}.variants`, variantAlias)
      .leftJoinAndSelect(`${productAlias}.images`, productImageAlias)
      .innerJoin(`${variantAlias}.orderDetails`, orderDetailAlias)
      .innerJoin(`${orderDetailAlias}.order`, orderAlias)
      .where(`${orderAlias}.user.id = :userId`, { userId: user.id })
      .skip((pageNum - 1) * pageSize)
      .take(pageSize);

    // Query : 리뷰할 수 있는 상품 조회
    if (filter === PurchasedProductFilter.REVIEWABLE) {
      productsQuery = productsQuery
        .leftJoin(
          `${productAlias}.reviews`,
          reviewAlias,
          `${reviewAlias}.user.id = ${orderAlias}.user.id`,
        )
        .andWhere(`${reviewAlias}.user.id IS NULL`);
    }

    const [products, count] = await productsQuery.getManyAndCount();

    const list = products.map(
      (product) => new PurchasedProductResponse(product),
    );

    return getPagination(list, count, { pageNum: 1, pageSize: 10 });
  }

  private checkProductExistence(isExist: boolean) {
    checkExistence(isExist, ERROR.PRODUCT.NOT_FOUND);
  }

  private checkCategoryExistence(isExist: boolean) {
    checkExistence(isExist, ERROR.CATEGORY.NOT_FOUND);
  }
}
