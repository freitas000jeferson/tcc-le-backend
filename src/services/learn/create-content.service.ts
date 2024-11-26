import { Inject, Injectable } from '@nestjs/common';
import { CreateNewContentDto } from 'src/modules/learn/dto/create-new-content.dto';
import {
  IGrammarRepository,
  GRAMMAR_REPOSITORY_NAME,
} from 'src/repository/grammar/i-grammar.repository';
import {
  IQuestionRepository,
  QUESTION_REPOSITORY_NAME,
} from 'src/repository/question/i-question.repository';
import {
  IVocabularyRepository,
  VOCABULARY_REPOSITORY_NAME,
} from 'src/repository/vocabulary/i-vocabulary.repository';
import { QuestionFactory } from './factories/question-factory';
import { GrammarFactory } from './factories/grammar-factory';
import { VocabularyFactory } from './factories/vocabulary-factory';

@Injectable()
export class CreateContentService {
  constructor(
    @Inject(VOCABULARY_REPOSITORY_NAME)
    private readonly vocabularyRepository: IVocabularyRepository,
    @Inject(GRAMMAR_REPOSITORY_NAME)
    private readonly grammarRepository: IGrammarRepository,
    @Inject(QUESTION_REPOSITORY_NAME)
    private readonly questionRepository: IQuestionRepository
  ) {}
  async handle(data: CreateNewContentDto) {
    return await Promise.all([
      this.questionRepository.insertMany(
        QuestionFactory.insertMany(data.questions)
      ),
      this.grammarRepository.insertMany(
        GrammarFactory.insertMany(data.grammars)
      ),
      this.vocabularyRepository.insertMany(
        VocabularyFactory.insertMany(data.vocabularies)
      ),
    ]);
  }
}
