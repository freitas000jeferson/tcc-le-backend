import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/commom/dtos/pagination-query.dto';
import { PaginationService } from 'src/commom/providers/pagination.service';
import { GetUserQueryDto } from 'src/modules/user/dto/get-user-query.dto';
import {
  IUserRepository,
  USER_REPOSITORY_NAME,
} from 'src/repository/user/i-user.repository';
import { UserFactory } from './user-factory';

@Injectable()
export class UserGetAllService {
  constructor(
    @Inject(USER_REPOSITORY_NAME)
    private userRepository: IUserRepository
  ) {}

  async handle(pagination: PaginationQueryDto, query: GetUserQueryDto) {
    const data = await this.userRepository.findAllPaginated(
      PaginationService.build(pagination),
      { ...query }
    );
    const countDocuments = await this.userRepository.countDocuments();
    const metadata = PaginationService.metadata(countDocuments, pagination);

    return { data: UserFactory.getAllUser(data), metadata };
  }
}
