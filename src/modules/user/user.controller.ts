import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationQueryDto } from 'src/commom/dtos/pagination-query.dto';
import { QueryTransformPipe } from 'src/commom/pipes/query-transform.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserQueryDto } from './dto/get-user-query.dto';
import { UserService } from './user.service';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard, AuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.userService.getById(id);
  }

  @UseGuards(JwtAuthGuard, AuthGuard)
  @Get('')
  async getAllPaginated(
    @Query(new QueryTransformPipe()) pagination: PaginationQueryDto,
    @Query(new QueryTransformPipe()) query: GetUserQueryDto
  ) {
    return await this.userService.getAllPaginated(pagination, query);
  }

  @Post('')
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() dto: any) {
  //   return await this.userService.update(id, dto);
  // }

  // @Delete(':id')
  // async delete(
  //   @Param('id') id: string,
  //   @Req() req: Request,
  //   @Res() res: Response
  // ) {
  //   return await this.userService.delete(id, req, res);
  // }
}
