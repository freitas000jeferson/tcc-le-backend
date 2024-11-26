import { VocabularyEntity } from 'src/entities/Vocabulary.entity';
import { Vocabulary } from './../../../model/mongo/Vocabulary';

export class VocabularyFactory {
  static insertMany(data: VocabularyEntity[]): Vocabulary[] {
    return data.map((el) => {
      const vocabulary = new Vocabulary();
      const date = new Date();
      vocabulary.createdAt = date;
      vocabulary.updatedAt = date;
      vocabulary.categoryId = el.categoryId as any;
      vocabulary.examples = el.examples;
      vocabulary.images = el.images;
      vocabulary.text = el.text;

      return vocabulary;
    });
  }
}
