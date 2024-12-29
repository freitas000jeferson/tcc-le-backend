import { Inject, Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from 'src/commom/exceptions';
import {
  CATEGORY_REPOSITORY_NAME,
  ICategoryRepository,
} from 'src/repository/category/i-category.repository';

@Injectable()
export class GetCategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY_NAME)
    private readonly categoryRepository: ICategoryRepository
  ) {}
  async handle(category: string) {
    const query = category.split(' ').map((el) => ({
      filter: el.toLowerCase(),
    }));
    const categories = await this.categoryRepository.findAll({
      $or: query,
    });
    if (!categories || categories?.length === 0) {
      throw new ResourceNotFoundException(
        `category-${category.split(' ').join('-')}`
      );
    }
    return categories[0];
  }
}
