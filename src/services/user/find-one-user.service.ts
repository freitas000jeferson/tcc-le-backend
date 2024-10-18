import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { UserDocument } from 'src/model/mongo';
import {
  IUserRepository,
  USER_REPOSITORY_NAME,
} from 'src/repository/user/i-user.repository';

@Injectable()
export class FindOneUserService {
  constructor(
    @Inject(USER_REPOSITORY_NAME)
    private userRepository: IUserRepository
  ) {}

  async handle(query?: FilterQuery<UserDocument>) {
    return await this.userRepository.findOne({ ...query });
  }
}
