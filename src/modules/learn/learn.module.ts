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
    CreateContentService,

    // implementacoes dos repositorios
    { provide: GRAMMAR_REPOSITORY_NAME, useClass: GrammarMongoRepository },
    { provide: QUESTION_REPOSITORY_NAME, useClass: QuestionMongoRepository },
    {
      provide: VOCABULARY_REPOSITORY_NAME,
      useClass: VocabularyMongoRepository,
    },
  ],
})
export class LearnModule {}
