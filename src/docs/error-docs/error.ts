import { HttpStatus } from '@nestjs/common';

export const ERROR = {
  USER: {
    NOT_FOUND: {
      status: HttpStatus.NOT_FOUND,
      message: '회원을 찾을 수 없습니다.',
    },
  },
  REVIEW: {
    CREATE_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '리뷰 등록 중 오류가 발생했습니다.',
    },
    UPDATE_ERROR: '리뷰 수정 중 오류가 발생했습니다.',
    DELETE_ERROR: '리뷰 삭제 중 오류가 발생했습니다.',
    NOT_FOUND: '리뷰 정보를 찾을 수 없습니다.',
  },
};
