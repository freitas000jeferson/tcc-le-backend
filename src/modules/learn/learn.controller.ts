import { AuthGuard } from '@nestjs/passport';
import { QueryTransformPipe } from 'src/commom/pipes/query-transform.pipe';
import { CreateQuestionsDto } from './dto/create-questions.dto';
import { GetLearningContentQueryDto } from './dto/get-learning-content-query.dto';
import { ValidateQuestionDto } from './dto/validate-question.dto';
import { LearnService } from './learn.service';
import { CreateNewContentDto } from './dto/create-new-content.dto';
import { CreateNewCategoryDto } from './dto/create-new-category.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentQuestionQueryDto } from './dto/get-current-question-query.dto';

@Controller({ path: 'learn', version: '1' })
export class LearnController {
  constructor(private readonly learnService: LearnService) {}
  @UseGuards(AuthGuard('basic'))
  @Post('questions')
  async createQuestions(@Body() createQuestionsDto: CreateQuestionsDto) {
    return await this.learnService.createQuestion(createQuestionsDto);
  }
  @UseGuards(AuthGuard('basic'))
  @Get('questions/:id')
  async getCurrentQuestion(
    @Param('id') id: string,
    @Query(new QueryTransformPipe()) query?: GetCurrentQuestionQueryDto
  ) {
    console.log('AQUI', id, query);
    return await this.learnService.getCurrentQuestion(id, query?.questionId);
  }

  @UseGuards(AuthGuard('basic'))
  @Post('questions/:id')
  async validateQuestion(
    @Param('id') id: string,
    @Body() validateQuestionDto: ValidateQuestionDto
  ) {
    return await this.learnService.validateQuestion(id, validateQuestionDto);
  }

  @UseGuards(AuthGuard('basic'))
  @Get(':type')
  async getLearningContent(
    @Param('type') typeContent: string,
    @Query(new QueryTransformPipe()) query: GetLearningContentQueryDto
  ) {
    console.log('GET LEARNING', typeContent, query);
    return await this.learnService.getLearningContent(typeContent, query);
  }

  @Post('new-content')
  async saveContent(@Body() createNewContentDto: CreateNewContentDto) {
    return await this.learnService.saveContent(createNewContentDto);
  }
  @Post('category')
  async saveCategory(@Body() createNewCategoryDto: CreateNewCategoryDto) {
    return await this.learnService.saveCategory(createNewCategoryDto);
  }
}
