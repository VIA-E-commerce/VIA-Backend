import { getMaxMessage } from '@/common';

export const CART_ITEM = {
  QUANTITY: {
    KR: '수량',
    MAX: 25,
    get MAX_MESSAGE() {
      return getMaxMessage({ property: this.KR, max: this.MAX });
    },
  },
};
