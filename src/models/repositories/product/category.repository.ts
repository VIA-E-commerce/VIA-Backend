import { EntityRepository, Repository } from 'typeorm';

import { Category } from '@/models';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async findByCode(code: string) {
    return this.findOne({ where: { code } });
  }
}
