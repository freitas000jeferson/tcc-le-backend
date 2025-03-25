import {
  GrammarDocument,
  QuestionDocument,
  VocabularyDocument,
} from 'src/model/mongo';
import {
  GrammarResponseDto,
  QuestionResponseDto,
  VocabularyResponseDto,
} from 'src/modules/learn/dto/get-learning-content-response.dto';

export class LearningContentFactory {
  static toEntity(
    data: (VocabularyDocument | GrammarDocument | QuestionDocument)[],
    type: string
  ): (GrammarResponseDto | QuestionResponseDto | VocabularyResponseDto)[] {
    if (type.toUpperCase() === 'VOCABULARY') {
      return data.map(
        (el: VocabularyDocument) =>
          ({
            text: el.text,
            images: el.images,
            examples: el.examples,
          } as VocabularyResponseDto)
      );
    } else if (type.toUpperCase() === 'GRAMMAR') {
      return data.map(
        (el: GrammarDocument) =>
          ({
            text: el.text,
            images: el.images,
            examples: el.examples,
          } as GrammarResponseDto)
      );
    } else if (type.toUpperCase() === 'QUESTION') {
      return data.map(
        (el: QuestionDocument) =>
          ({
            text: el.text,
            image: el.image,
            options: el.options,
            answer: el.answer,
            answerId: el.answerId,
          } as QuestionResponseDto)
      );
    }
  }
}
