import { Category } from '@/models';

import { CategoryResponseDec } from '../decorator';

export class CategoryResponse {
  @CategoryResponseDec.categoryId()
  id: number;

  @CategoryResponseDec.name()
  name: string;

  @CategoryResponseDec.code()
  code: string;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.code = category.code;
  }
}
