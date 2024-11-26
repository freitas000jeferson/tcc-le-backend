import { GrammarEntity } from 'src/entities/Grammar.entity';
import { Grammar } from './../../../model/mongo/Grammar';

export class GrammarFactory {
  static insertMany(data: GrammarEntity[]): Grammar[] {
    return data.map((el) => {
      const grammar = new Grammar();
      const date = new Date();
      grammar.createdAt = date;
      grammar.updatedAt = date;
      grammar.categoryId = el.categoryId as any;
      grammar.examples = el.examples;
      grammar.images = el.images;
      grammar.text = el.text;

      return grammar;
    });
  }
}
