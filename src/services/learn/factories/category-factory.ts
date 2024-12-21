import { CategoryEntity } from 'src/entities/Category.entity';
import { Category } from './../../../model/mongo/Category';

export class CategoryFactory {
  static insertMany(data: CategoryEntity[]): Category[] {
    return data?.map((el) => {
      const category = new Category();
      const date = new Date();
      category.createdAt = date;
      category.updatedAt = date;
      category.name = el.name;
      category.description = el.description;
      category.filter = el.filter;

      return category;
    });
  }
}
