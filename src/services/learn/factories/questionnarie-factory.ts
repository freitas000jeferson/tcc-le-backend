import {
  QuestionData,
  QuestionDocument,
  Questionnarie,
  QuestionnarieStatus,
  QuestionStatus,
} from 'src/model/mongo';
import { QuestionResponseDto } from 'src/modules/learn/dto/question-response.dto';

export class QuestionnarieFactory {
  static create(userId, questions: QuestionDocument[]) {
    const response = new Questionnarie();
    const date = new Date();
    response.userId = userId;
    response.status = QuestionnarieStatus.TO_DO;
    response.totalCorrectAnswers = 0;
    response.totalQuestions = questions.length;
    response.questions = questions.map((question) =>
      QuestionnarieFactory.formatQuestion(question)
    );
    response.createdAt = date;
    response.updatedAt = date;

    return response;
  }
  static formatQuestion(question: QuestionDocument) {
    const response = new QuestionData();
    response.id = question.id;
    response.text = question.text;
    response.image = question.image;
    response.options = question.options;
    response.answer = question.answer;
    response.answerId = question.answerId;
    response.categoryId = question.categoryId;
    // resposta do usuario
    response.answered = undefined;
    response.answeredId = undefined;
    response.status = QuestionStatus.TO_DO;
    return response;
  }
  static questionResponse(data?: QuestionData): QuestionResponseDto {
    if (!data) return undefined;
    const response = new QuestionData();
    response.id = data.id;
    response.text = data.text;
    response.image = data.image;
    response.options = data.options;
    response.status = data.status;
    return response;
  }
}
