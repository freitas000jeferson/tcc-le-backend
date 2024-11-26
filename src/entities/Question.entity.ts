export class OptionEntity {
  id: number;
  text: string;
}

export class QuestionEntity {
  id?: string;
  text?: string[];
  image?: string;
  options?: OptionEntity[];
  answer: string;
  answerId?: number;
  categoryId: string;
  level: number;
  createdAt?: Date;
  updateAt?: Date;
}
