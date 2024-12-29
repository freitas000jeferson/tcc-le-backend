import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IQuestionnarieRepository,
  QUESTIONNARIE_REPOSITORY_NAME,
} from 'src/repository/questionnarie/i-questionnarie.repository';
import { ResourceNotFoundException } from 'src/commom/exceptions';
import { QuestionnarieStatus, QuestionStatus } from 'src/model/mongo';
import { QuestionnarieResponseDto } from 'src/modules/learn/dto/question-response.dto';
import { QuestionnarieFactory } from './factories/questionnarie-factory';

interface HadleProps {
  id: string;
  questionId: string;
  answer: string;
  answerId?: number;
}

@Injectable()
export class ValidateQuestionService {
  constructor(
    @Inject(QUESTIONNARIE_REPOSITORY_NAME)
    private readonly questionnarieRepository: IQuestionnarieRepository
  ) {}

  async handle({
    id,
    questionId,
    answer,
    answerId,
  }: HadleProps): Promise<QuestionnarieResponseDto> {
    const questionnarie = await this.questionnarieRepository.findById(id);
    if (!questionnarie) {
      throw new ResourceNotFoundException(`questionnarie-${id}`);
    }
    if (questionnarie.status === QuestionnarieStatus.DONE) {
      throw new NotFoundException('questionnarie-has-already-been-answered');
    }

    const questionIndex = questionnarie.questions.findIndex(
      (q) => q.id === questionId
    );
    if (questionIndex === -1) {
      throw new ResourceNotFoundException(`question-${questionId}`);
    }
    const isRight = answer === questionnarie.questions[questionIndex].answer;

    questionnarie.questions[questionIndex].answered = answer;
    questionnarie.questions[questionIndex].answeredId = answerId;
    questionnarie.questions[questionIndex].status = isRight
      ? QuestionStatus.RIGTH
      : QuestionStatus.WRONG;

    if (isRight) {
      questionnarie.totalCorrectAnswers += 1;
    }
    const allQuestionsAnswered = questionnarie.questions.every(
      (question) => question.status !== QuestionStatus.TO_DO
    );
    questionnarie.status = allQuestionsAnswered
      ? QuestionnarieStatus.DONE
      : QuestionnarieStatus.DOING;

    questionnarie.updatedAt = new Date();

    console.log(JSON.stringify(questionnarie, null, 2));

    await this.questionnarieRepository.update(
      { _id: questionnarie._id },
      questionnarie
    );

    return {
      id: questionnarie.id,
      status: questionnarie.status,
      lastQuestionStatus: questionnarie.questions[questionIndex].status,
      totalQuestions: questionnarie.totalQuestions,
      totalCorrectAnswers: questionnarie.totalCorrectAnswers,
      question: QuestionnarieFactory.questionResponse(
        questionnarie.questions[questionIndex + 1]
      ),
    };
  }
}
