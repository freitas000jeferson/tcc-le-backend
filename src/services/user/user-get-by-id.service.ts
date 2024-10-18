import { Inject, Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from 'src/commom/exceptions';
import {
  IUserRepository,
  USER_REPOSITORY_NAME,
} from 'src/repository/user/i-user.repository';
import { UserFactory } from './user-factory';

@Injectable()
export class UserGetByIdService {
  constructor(
    @Inject(USER_REPOSITORY_NAME)
    private userRepository: IUserRepository
  ) {}

  async handle(id: string) {
    const data = await this.userRepository.findById(id);
    if (!data) {
      throw new ResourceNotFoundException(`user:${id}`);
    }

    return UserFactory.getUser(data);
  }
}
