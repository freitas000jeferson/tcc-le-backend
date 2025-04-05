import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IQuestionnarieRepository,
  QUESTIONNARIE_REPOSITORY_NAME,
} from 'src/repository/questionnarie/i-questionnarie.repository';
import { ResourceNotFoundException } from 'src/commom/exceptions';
import {
  QuestionnarieDocument,
  QuestionnarieStatus,
  QuestionStatus,
} from 'src/model/mongo';
import { QuestionnarieResponseDto } from 'src/modules/learn/dto/question-response.dto';
import { QuestionnarieFactory } from './factories/questionnarie-factory';
import { PaginationService } from 'src/commom/providers/pagination.service';

interface HadleProps {
  id: string;
  questionId?: string;
}

@Injectable()
export class GetCurrentQuestionService {
  constructor(
    @Inject(QUESTIONNARIE_REPOSITORY_NAME)
    private readonly questionnarieRepository: IQuestionnarieRepository
  ) {}

  async handle({
    id,
    questionId,
  }: HadleProps): Promise<QuestionnarieResponseDto> {
    let questionnarie = await this.questionnarieRepository.findById(id);
    if (!questionnarie) {
      const pagination = PaginationService.build({
        size: 1,
        order: 'updatedAt',
        sort: 'desc',
      });

      const questionnarieFiltered =
        await this.questionnarieRepository.findAllPaginated(pagination, {
          userId: id,
        });
      if (questionnarieFiltered && questionnarieFiltered.length > 0) {
        questionnarie = questionnarieFiltered[0];
      }
    }
    if (!questionnarie) {
      throw new ResourceNotFoundException(`questionnarie-${id}`);
    }
    let question = null;
    if (questionId) {
      question = questionnarie.questions.find((q) => q.id === questionId);
    } else if (questionnarie.status === QuestionnarieStatus.DONE) {
      question = questionnarie.questions[questionnarie.questions.length - 1];
    } else {
      question = questionnarie.questions.find((q) => q.status === 'TO_DO');
    }

    return {
      id: questionnarie.id,
      status: questionnarie.status,
      lastQuestionStatus: question.status,
      totalQuestions: questionnarie.totalQuestions,
      totalCorrectAnswers: questionnarie.totalCorrectAnswers,
      question: QuestionnarieFactory.questionResponse(question),
    };
  }
}
