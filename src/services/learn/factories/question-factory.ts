import { QuestionEntity } from 'src/entities/Question.entity';
import { Option, Question } from 'src/model/mongo';

export class QuestionFactory {
  static insertMany(data: QuestionEntity[]): Question[] {
    return data.map((el) => {
      const question = new Question();
      const date = new Date();
      question.createdAt = date;
      question.updatedAt = date;
      question.text = el.text;
      question.image = el.image;
      question.level = el.level;
      question.categoryId = el.categoryId as any;
      question.answerId = el.answerId;
      question.image = el.image;
      question.answer = el.answer;
      question.options = el.options.map((op) => {
        const option = new Option();
        option.id = op.id;
        option.text = op.text;
        return option;
      });
      return question;
    });
  }
}
