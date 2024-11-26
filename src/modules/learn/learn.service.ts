import { Injectable } from '@nestjs/common';
import { CreateNewContentDto } from './dto/create-new-content.dto';
import { CreateContentService } from 'src/services/learn/create-content.service';

@Injectable()
export class LearnService {
  constructor(private readonly createContentService: CreateContentService) {}
  async createQuestion(createQuestionsDto) {
    return 'TODO';
  }
  async validateQuestion(id, validateQuestionDto) {
    return 'TODO';
  }
  async getLearningContent() {
    return 'TODO';
  }

  async saveContent(createNewContentDto: CreateNewContentDto) {
    return await this.createContentService.handle(createNewContentDto);
  }
}
