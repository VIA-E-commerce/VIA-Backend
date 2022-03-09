import { Connection, EntityManager } from 'typeorm';

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
  } finally {
    await queryRunner.release();
  }
}
