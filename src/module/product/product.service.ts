import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getPagination, Pagination } from '@/common';
import { ColorRepository } from '@/module/color';
import { SizeValueRepository } from '@/module/size';
import { User } from '@/module/user';

import {
  ProductListQuery,
  ProductCardResponse,
  ProductDetailResponse,
} from './dto';
import { Product, Category, Wishlist } from './entity';
import { ProductSort } from './enum';
import { PRODUCT_ERROR } from './product.constant';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly colorRepository: ColorRepository,
    private readonly sizeValueRepository: SizeValueRepository,
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  async getAll({
    pageNum,
    pageSize,
    category,
    sort,
  }: ProductListQuery): Promise<Pagination<ProductCardResponse>> {
    const [productAlias, categoryAlias, productImageAlias] = [
      'product',
      'category',
      'image',
    ];

    const query = this.productRepository
      .createQueryBuilder(productAlias)
      .leftJoinAndSelect(`${productAlias}.category`, categoryAlias)
      .leftJoinAndSelect(`${productAlias}.images`, productImageAlias)
      .orderBy(`${productImageAlias}.order`, 'ASC')
      .skip((pageNum - 1) * pageSize)
      .take(pageSize);

    // 정렬 방식 지정
    switch (sort) {
      case ProductSort.PRICE_ASC:
        query.orderBy(`${productAlias}.sellingPrice`, 'ASC');
        break;
      case ProductSort.PRICE_DESC:
        query.orderBy(`${productAlias}.sellingPrice`, 'DESC');
        break;
      case ProductSort.BEST_SELLING:
        query.orderBy(`${productAlias}.salesVolume`, 'DESC');
        break;
      case ProductSort.REVIEW_DESC:
        query.orderBy(`${productAlias}.reviewCount`, 'DESC');
        break;
      default:
        query.orderBy(`${productAlias}.createdAt`, 'DESC');
    }

    // 상품 그룹별 필터링
    if (category === 'sale') {
      query.where(`${productAlias}.retailPrice > ${productAlias}.sellingPrice`);
    } else if (category === 'new') {
      query.where(
        `${productAlias}.createdAt BETWEEN DATE_ADD(NOW(), INTERVAL -1 MONTH) AND NOW()`,
      );
    } else if (category) {
      const dbCategory = await this.categoryRepository.findOne({
        where: {
          code: category,
        },
      });

      if (!dbCategory) {
        throw new HttpException(
          '카테고리를 찾을 수 없습니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      query.where(`${categoryAlias}.code = :code`, {
        code: category,
      });
    }

    // 상품 목록 조회 (+ 페이지네이션)
    const [productList, count] = await query.getManyAndCount();

    const responseData = productList.map(
      (item) => new ProductCardResponse(item),
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

    this.checkProductExistence(product);

    const wished = await this.wishlistRepository.findOne({
      where: {
        product: { id: productId },
        user,
      },
    });

    const colors = await this.colorRepository.findByProductId(productId);
    const sizeValues = await this.sizeValueRepository.findByProductId(
      productId,
    );

    return new ProductDetailResponse(product, colors, sizeValues, !!wished);
  }

  async addToWishlist(productId: number, user: User) {
    const result = await this.wishlistRepository.insert({
      product: { id: productId },
      user,
    });

    if (result.raw === 0) {
      throw new HttpException(
        '위시리스트에 상품 추가 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeFromWishlist(productId: number, user: User) {
    const result = await this.wishlistRepository.delete({
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
  }

  private checkProductExistence(product: Product) {
    if (!product) {
      throw new HttpException(PRODUCT_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
