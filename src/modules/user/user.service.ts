import { Injectable } from '@nestjs/common';

import { PaginationQueryDto } from 'src/commom/dtos/pagination-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserQueryDto } from './dto/get-user-query.dto';

import { ApiDefaultResponse } from 'src/commom/dtos/api-default-response.dto';
import {
  UserCreateService,
  UserGetAllService,
  UserGetByIdService,
} from 'src/services/user';

@Injectable()
export class UserService {
  constructor(
    private userCreateService: UserCreateService,
    private userGetAllService: UserGetAllService,
    private userGetByIdService: UserGetByIdService
  ) {}

  async getById(id: string) {
    const response = await this.userGetByIdService.handle(id);

    return new ApiDefaultResponse(response);
  }

  async getAllPaginated(
    pagination: PaginationQueryDto,
    query: GetUserQueryDto
  ) {
    const response = await this.userGetAllService.handle(pagination, query);
    return Object.assign(new ApiDefaultResponse(), response);
  }

  async create(dto: CreateUserDto) {
    const response = await this.userCreateService.handle(dto);

    return new ApiDefaultResponse(response);
  }

  // async update(id: string, dto: any) {
  //   console.log('update');
  //   throw new Error('');
  // }
  // async delete(id: string, req: Request, res: Response) {
  //   console.log('delete');
  //   throw new Error('');
  // }
}
