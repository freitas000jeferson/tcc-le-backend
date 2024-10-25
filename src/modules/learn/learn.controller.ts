import { Body, Controller, Post } from '@nestjs/common';
import { CreateLearnDto } from './dto/create-learn.dto';
import { LearnService } from './learn.service';

@Controller('learn')
export class LearnController {
  constructor(private readonly learnService: LearnService) {}

  @Post('questions')
  createQuestions(@Body() createLearnDto: CreateLearnDto) {
    return this.learnService.create(createLearnDto);
  }

  @Post('questions/:id')
  create(@Body() createLearnDto: CreateLearnDto) {
    return this.learnService.create(createLearnDto);
  }
}
