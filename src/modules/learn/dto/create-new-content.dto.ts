import { GrammarEntity } from 'src/entities/Grammar.entity';
import { QuestionEntity } from 'src/entities/Question.entity';
import { VocabularyEntity } from 'src/entities/Vocabulary.entity';

export class CreateNewContentDto {
  questions?: QuestionEntity[];
  grammars?: GrammarEntity[];
  vocabularies?: VocabularyEntity[];
}
