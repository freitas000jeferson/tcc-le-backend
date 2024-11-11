import { Injectable } from '@nestjs/common';

@Injectable()
export class LearnService {
  async createQuestion(createQuestionsDto) {
    return 'TODO';
  }
  async validateQuestion(id, validateQuestionDto) {
    return 'TODO';
  }
  async getLearningContent() {
    return 'TODO';
  }
}
