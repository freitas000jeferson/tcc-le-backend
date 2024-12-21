import { Injectable } from '@nestjs/common';
import { CreateNewContentDto } from './dto/create-new-content.dto';
import { CreateContentService } from 'src/services/learn/create-content.service';
import { CreateNewCategoryDto } from './dto/create-new-category.dto';
import { CreateCategoryService } from 'src/services/learn/create-category.service';
import { GetLearningContentService } from 'src/services/learn/get-learning-content.service';
import { GetLearningContentQueryDto } from './dto/get-learning-content-query.dto';

@Injectable()
export class LearnService {
  constructor(
    private readonly createContentService: CreateContentService,
    private readonly createCategoryService: CreateCategoryService,
    private readonly getLearningContentService: GetLearningContentService
  ) {}
  async createQuestion(createQuestionsDto) {
    return 'TODO';
  }
  async validateQuestion(id, validateQuestionDto) {
    return 'TODO';
  }
  async getLearningContent(
    typeContent: string,
    query: GetLearningContentQueryDto
  ) {
    return await this.getLearningContentService.handle({
      type: typeContent,
      category: query.category,
      userId: query.userId,
    });
  }

  async saveContent(createNewContentDto: CreateNewContentDto) {
    return await this.createContentService.handle(createNewContentDto);
  }
  async saveCategory(createNewCategoryDto: CreateNewCategoryDto) {
    return await this.createCategoryService.handle(createNewCategoryDto);
  }
}
