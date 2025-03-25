import { GrammarEntity } from 'src/entities/Grammar.entity';
import { OptionEntity, QuestionEntity } from 'src/entities/Question.entity';
import { VocabularyEntity } from 'src/entities/Vocabulary.entity';
export class VocabularyResponseDto
  implements Omit<VocabularyEntity, 'id' | 'categoryId' | 'updatedAt'>
{
  text: string[];
  images: string[];
  examples: string[];
}
export class GrammarResponseDto
  implements Omit<GrammarEntity, 'id' | 'categoryId' | 'updatedAt'>
{
  text: string[];
  images: string[];
  examples: string[];
}
export class QuestionResponseDto
  implements
    Omit<
      QuestionEntity,
      'id' | 'categoryId' | 'level' | 'createdAt' | 'updatedAt'
    >
{
  text?: string[];
  image?: string;
  options?: OptionEntity[];
  answer: string;
  answerId?: number;
}
