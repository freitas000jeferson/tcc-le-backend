import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionsDto } from 'src/modules/learn/dto/create-questions.dto';
import {
  IQuestionnarieRepository,
  QUESTIONNARIE_REPOSITORY_NAME,
} from 'src/repository/questionnarie/i-questionnarie.repository';
import { QuestionDocument } from 'src/model/mongo';
import { QuestionnarieFactory } from './factories/questionnarie-factory';
import { ResourceNotFoundException } from 'src/commom/exceptions';
import { QuestionnarieResponseDto } from 'src/modules/learn/dto/question-response.dto';
import { GetLearningContentService } from './get-learning-content.service';

const QUESTONS_LENGTH = 3;

@Injectable()
export class CreateQuestionService {
  constructor(
    @Inject(QUESTIONNARIE_REPOSITORY_NAME)
    private readonly questionnarieRepository: IQuestionnarieRepository,
    private readonly getLearningContentService: GetLearningContentService
  ) {}
  async handle({
    userId,
    category,
  }: CreateQuestionsDto): Promise<QuestionnarieResponseDto> {
    const questions = await this.getLearningContentService.handle({
      userId,
      category,
      length: QUESTONS_LENGTH,
      type: 'QUESTION',
    });

    if (!questions || questions?.length === 0) {
      throw new ResourceNotFoundException('question');
    }
    // as QuestionDocument[]
    const questionnarie = await this.questionnarieRepository.create(
      QuestionnarieFactory.create(userId, questions as QuestionDocument[])
    );

    return {
      id: questionnarie.id,
      status: questionnarie.status,
      totalQuestions: questionnarie.totalQuestions,
      totalCorrectAnswers: questionnarie.totalCorrectAnswers,
      question: QuestionnarieFactory.questionResponse(
        questionnarie.questions[0]
      ),
    };
  }
}
