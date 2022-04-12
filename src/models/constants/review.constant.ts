import { COMMON } from './common.constant';

export const REVIEW = {
  CONTENT: {
    KR: '리뷰 내용',
    MAX_LENGTH: 1000,
  },

  IMAGE_URL: {
    KR: '리뷰 썸네일',
    MAX_LENGTH: COMMON.URL_MAX_LENGTH,
  },

  RATING: {
    KR: '리뷰 평점',
    MIN: 1,
    MAX: 5,
  },
};
