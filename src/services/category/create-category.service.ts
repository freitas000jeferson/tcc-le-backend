import { Inject, Injectable } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY_NAME,
  ICategoryRepository,
} from 'src/repository/category/i-category.repository';
import { CreateNewCategoryDto } from 'src/modules/learn/dto/create-new-category.dto';
import { CategoryFactory } from './factories/category-factory';

@Injectable()
export class CreateCategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY_NAME)
    private readonly categoryRepository: ICategoryRepository
  ) {}
  async handle(data: CreateNewCategoryDto) {
    return await this.categoryRepository.insertMany(
      CategoryFactory.insertMany(data?.categories)
    );
  }
}
