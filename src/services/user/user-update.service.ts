import { Inject, Injectable } from '@nestjs/common';
import { UserType } from 'src/auth/decorators/user.decorator';
import { ResourceNotFoundException } from 'src/commom/exceptions';
import { User } from 'src/model/mongo';
import {
  IUserRepository,
  USER_REPOSITORY_NAME,
} from 'src/repository/user/i-user.repository';
import { UserFactory } from './user-factory';

@Injectable()
export class UserUpdateService {
  constructor(
    @Inject(USER_REPOSITORY_NAME)
    private userRepository: IUserRepository
  ) {}

  async handle(user: UserType, dto: Partial<User>) {
    const userExists = await this.userRepository.findOne({ email: user.email });
    if (!userExists) {
      throw new ResourceNotFoundException(`user:${user.email}`);
    }

    const data = UserFactory.updateUser(userExists, dto);

    const response = await this.userRepository.update(data, userExists.id);
    return {
      id: response._id,
      username: data.username,
      email: data.email,
    };
  }
}
