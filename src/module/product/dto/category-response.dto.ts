import { SwaggerDoc } from '@/common';
import { CategoryDoc } from '@/docs';
import { Category } from '@/models';

export class CategoryResponse {
  @SwaggerDoc.id('카테고리 식별자')
  id: number;

  @CategoryDoc.name()
  name: string;

  @CategoryDoc.code()
  code: string;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.code = category.code;
  }
}
