import { GrammarEntity } from 'src/entities/Grammar.entity';
import { QuestionEntity } from 'src/entities/Question.entity';
import { VocabularyEntity } from 'src/entities/Vocabulary.entity';
import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateNewContentDto {
  @IsOptional()
  @IsArray()
  @Type(() => QuestionEntity)
  @ValidateNested()
  questions?: QuestionEntity[];

  @IsOptional()
  @IsArray()
  @Type(() => GrammarEntity)
  @ValidateNested()
  grammars?: GrammarEntity[];

  @IsOptional()
  @IsArray()
  @Type(() => VocabularyEntity)
  @ValidateNested()
  vocabularies?: VocabularyEntity[];
}
