import { Pagination } from '@/common/dtos';
import { PagingOptions } from '@/common/interfaces';

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
