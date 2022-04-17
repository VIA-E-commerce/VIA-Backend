import { HttpStatus } from '@nestjs/common';

import { Dictionary } from '@/common';

export interface ErrorObject {
  status: HttpStatus;
  message: string;
}

type ErrorInfo = Dictionary<Dictionary<ErrorObject>>;

export const ERROR: ErrorInfo = {
  ADDRESS: {
    CREATE_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '주소 생성 중 오류가 발생했습니다.',
    },
    UPDATE_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '주소 정보 업데이트 중 오류가 발생했습니다.',
    },
    DELETE_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '주소를 제거하는데 실패했습니다.',
    },
    NOT_FOUND: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '주소를 찾을 수 없습니다.',
    },
  },

  AUTH: {
    DUPLICATE_EMAIL: {
      status: HttpStatus.BAD_REQUEST,
      message: '이미 등록된 이메일입니다.',
    },
    JOIN_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '회원가입 중 알 수 없는 오류가 발생했습니다.',
    },
    BAD_AUTH_REQUEST: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '잘못된 인증 정보입니다.',
    },
    JWT_ERROR: {
      status: HttpStatus.BAD_REQUEST,
      message: '토큰 발급 중 오류가 발생했습니다.',
    },
    MISMATCHED_SNS_INFO: {
      status: HttpStatus.BAD_REQUEST,
      message: '다른 SNS 아이디가 계정과 연동되어 있습니다.',
    },
    REFRESH_FAILURE: {
      status: HttpStatus.BAD_REQUEST,
      message: 'Refresh 토큰 갱신에 실패했습니다.',
    },
  },

  CART: {
    CREATE_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '장바구니 담기 중 오류가 발생했습니다.',
    },
    UPDATE_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '장바구니 아이템 업데이트 중 오류가 발생했습니다.',
    },
    NOT_FOUND: {
      status: HttpStatus.NOT_FOUND,
      message: '장바구니에서 해당 상품을 찾을 수 없습니다.',
    },
    ITEM_NOT_FOUND: {
      status: HttpStatus.NOT_FOUND,
      message: '장바구니 아이템을 찾을 수 없습니다.',
    },
    NOT_SUPPORT_VARIANT: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '현재 상품에서 지원하지 않는 옵션입니다.',
    },
    OUT_OF_STOCK: {
      status: HttpStatus.CONFLICT,
      message: '재고가 부족합니다.',
    },
    VARIANT_CONFLICT: {
      status: HttpStatus.CONFLICT,
      message: '변경하려는 옵션이 이미 담겨있습니다.',
    },
  },

  ORDER: {
    CREATE_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '주문 등록 중 오류가 발생했습니다.',
    },
    NOT_FOUND: {
      status: HttpStatus.NOT_FOUND,
      message: '주문 내역을 찾을 수 없습니다.',
    },
  },

  CATEGORY: {
    NOT_FOUND: {
      status: HttpStatus.NOT_FOUND,
      message: '카테고리를 찾을 수 없습니다.',
    },
  },

  PRODUCT: {
    NOT_FOUND: {
      status: HttpStatus.NOT_FOUND,
      message: '상품을 찾을 수 없습니다.',
    },
  },

  QUESTION: {
    CREATE_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '상품 문의 등록 중 오류가 발생했습니다.',
    },
    UPDATE_ERROR: {
      status: HttpStatus.BAD_REQUEST,
      message: '상품 문의 수정 중 오류가 발생했습니다.',
    },
    DELETE_ERROR: {
      status: HttpStatus.BAD_REQUEST,
      message: '상품 문의 제거 중 오류가 발생했습니다.',
    },
    NOT_FOUND: {
      status: HttpStatus.NOT_FOUND,
      message: '문의 글을 찾을 수 없습니다.',
    },
    FORBIDDEN: {
      status: HttpStatus.FORBIDDEN,
      message: '접근 권한이 없습니다.',
    },
  },

  REVIEW: {
    CREATE_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '리뷰 등록 중 오류가 발생했습니다.',
    },
    UPDATE_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '리뷰 수정 중 오류가 발생했습니다.',
    },
    DELETE_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '리뷰 삭제 중 오류가 발생했습니다.',
    },
    NOT_FOUND: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '리뷰 정보를 찾을 수 없습니다.',
    },
  },

  USER: {
    NOT_FOUND: {
      status: HttpStatus.NOT_FOUND,
      message: '회원을 찾을 수 없습니다.',
    },
  },
};
