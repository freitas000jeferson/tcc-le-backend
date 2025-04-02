import { Module } from '@nestjs/common';
import { LearnService } from './learn.service';
import { LearnController } from './learn.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelDefinitions } from 'src/model/mongo/model-definitions';
import { GrammarMongoRepository } from 'src/repository/grammar/implementations/grammar-mongo.repository';
import { GRAMMAR_REPOSITORY_NAME } from 'src/repository/grammar/i-grammar.repository';
import { QUESTION_REPOSITORY_NAME } from 'src/repository/question/i-question.repository';
import { QuestionMongoRepository } from 'src/repository/question/implementations/question-mongo.repository';
import { VOCABULARY_REPOSITORY_NAME } from 'src/repository/vocabulary/i-vocabulary.repository';
import { VocabularyMongoRepository } from 'src/repository/vocabulary/implementations/vocabulary-mongo.repository';
import { CreateContentService } from 'src/services/learn/create-content.service';
import { CATEGORY_REPOSITORY_NAME } from 'src/repository/category/i-category.repository';
import { CategoryMongoRepository } from 'src/repository/category/implementations/category-mongo.repository';
import { CreateCategoryService } from 'src/services/category/create-category.service';
import { GetSettingsService } from 'src/services/settings/get-settings.service';
import { HISTORY_REPOSITORY_NAME } from 'src/repository/history/i-history.repository';
import { HistoryMongoRepository } from 'src/repository/history/implementations/history-mongo.repository';
import { QUESTIONNARIE_REPOSITORY_NAME } from 'src/repository/questionnarie/i-questionnarie.repository';
import { QuestionnarieMongoRepository } from 'src/repository/questionnarie/implementations/questionnarie-mongo.repository';

import { GetCategoryService } from 'src/services/category/get-category.service';
import { CreateQuestionService } from 'src/services/learn/create-question.service';
import { ValidateQuestionService } from 'src/services/learn/validate-question.service';
import { GetLearningContentFilterService } from 'src/services/learn/get-learning-content-filter.service';
import { GetLearningContentService } from 'src/services/learn/get-learning-content.service';
import { FindContentByIdsService } from 'src/services/learn/find-content-by-ids.service';
import { InsertManyHistoriesService } from 'src/services/history/insert-many-histories.service';
import { GetRecycledContentByHistoryService } from 'src/services/history/get-recycled-content-by-history.service';
import { FindHistoryService } from 'src/services/history/find-history.service';
import { GetCurrentQuestionService } from 'src/services/learn/get-current-question.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      ModelDefinitions.AccessToken,
      ModelDefinitions.User,
      ModelDefinitions.Category,
      ModelDefinitions.Grammar,
      ModelDefinitions.History,
      ModelDefinitions.Message,
      ModelDefinitions.Question,
      ModelDefinitions.Settings,
      ModelDefinitions.Vocabulary,
      ModelDefinitions.Questionnarie,
    ]),
  ],
  controllers: [LearnController],
  providers: [
    LearnService,

    // services
    CreateCategoryService,
    GetCategoryService,
    // ----
    CreateContentService,
    GetLearningContentService,
    GetLearningContentFilterService,
    FindContentByIdsService,
    // ----
    GetCurrentQuestionService,
    CreateQuestionService,
    ValidateQuestionService,
    // -----
    FindHistoryService,
    InsertManyHistoriesService,
    GetRecycledContentByHistoryService,
    // -----
    GetSettingsService,

    // implementacoes dos repositorios
    { provide: GRAMMAR_REPOSITORY_NAME, useClass: GrammarMongoRepository },
    { provide: QUESTION_REPOSITORY_NAME, useClass: QuestionMongoRepository },
    {
      provide: VOCABULARY_REPOSITORY_NAME,
      useClass: VocabularyMongoRepository,
    },
    {
      provide: CATEGORY_REPOSITORY_NAME,
      useClass: CategoryMongoRepository,
    },
    {
      provide: HISTORY_REPOSITORY_NAME,
      useClass: HistoryMongoRepository,
    },
    {
      provide: QUESTIONNARIE_REPOSITORY_NAME,
      useClass: QuestionnarieMongoRepository,
    },
  ],
})
export class LearnModule {}
