import { Injectable } from '@nestjs/common';
import {
  GetLearningContentService,
  HandleProps as GetLearningContentServiceHandleProps,
} from './get-learning-content.service';
import { LearningContentFactory } from './factories/learning-content-factory';
import {
  GrammarResponseDto,
  QuestionResponseDto,
  VocabularyResponseDto,
} from 'src/modules/learn/dto/get-learning-content-response.dto';
import { ResourceNotFoundException } from 'src/commom/exceptions';

interface HandleProps {
  type: string;
  category: string;
  userId: string;
}
@Injectable()
export class GetLearningContentFilterService {
  constructor(
    private readonly getLearningContentService: GetLearningContentService
  ) {}

  async handle({
    type,
    category,
    userId,
  }: HandleProps): Promise<
    (GrammarResponseDto | QuestionResponseDto | VocabularyResponseDto)[]
  > {
    const props: GetLearningContentServiceHandleProps = {
      type,
      category: category,
      userId: userId,
      length: 1,
    };
    if (type.toUpperCase() === 'VOCABULARY') {
      props.categoryId = '67ed2a75f83e062d0d5c930f';
    } else if (type.toUpperCase() === 'GRAMMAR') {
      // nao tem adicional
    } else {
      throw new ResourceNotFoundException(`Content:${type}-${category}`);
    }
    const response = await this.getLearningContentService.handle(props);
    return LearningContentFactory.toEntity(response, type);
  }
}
