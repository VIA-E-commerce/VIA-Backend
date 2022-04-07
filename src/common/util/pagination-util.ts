import { Pagination } from '@/common/dto';
import { PagingOptions } from '@/common/interface';

export function getPagination<T>(
  list: T[],
  totalElements: number,
  { pageNum, pageSize }: PagingOptions,
): Pagination<T> {
  const totalPages = Math.ceil(totalElements / pageSize);

  return {
    list,
    totalElements,
    totalPages,
    pageNum,
    pageSize,
    isFirst: pageNum === 1,
    isLast: pageNum === totalPages,
  };
}
