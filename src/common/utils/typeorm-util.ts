import { Connection, EntityManager, SelectQueryBuilder } from 'typeorm';

import { PagingQuery } from '../dtos';

export async function useTransaction(
  connection: Connection,
  fn: (entityManager: EntityManager) => Promise<void>,
) {
  const queryRunner = connection.createQueryRunner();
  await queryRunner.connect();

  await queryRunner.startTransaction();
  try {
    await fn(queryRunner.manager);
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
}

export function setQuerySkipAndTake<T>(
  query: SelectQueryBuilder<T>,
  { pageNum, pageSize }: PagingQuery,
) {
  query.skip((pageNum - 1) * pageSize).take(pageSize);
}
