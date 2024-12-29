import {
  QuestionData,
  QuestionnarieStatus,
  QuestionStatus,
} from 'src/model/mongo';
export type QuestionResponseDto = Omit<
  QuestionData,
  'answer' | 'answerId' | 'categoryId' | 'answered' | 'answeredId'
>;

export class QuestionnarieResponseDto {
  id: string;
  status: QuestionnarieStatus;
  lastQuestionStatus?: QuestionStatus;
  totalQuestions: number;
  totalCorrectAnswers: number;
  question: QuestionResponseDto;
}
