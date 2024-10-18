import { Inject, Injectable } from '@nestjs/common';
import { AlreadyExistException } from 'src/commom/exceptions';
import { HashEncryptorService } from 'src/commom/providers/hash-encryptor.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import {
  IUserRepository,
  USER_REPOSITORY_NAME,
} from 'src/repository/user/i-user.repository';
import { UserFactory } from './user-factory';

@Injectable()
export class UserCreateService {
  constructor(
    @Inject(USER_REPOSITORY_NAME)
    private userRepository: IUserRepository
  ) {}

  async handle(dto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({ email: dto.email });
    if (userExists) {
      throw new AlreadyExistException('email');
    }

    const password = await HashEncryptorService.hashPassword(dto.password);

    const data = UserFactory.createUser({ ...dto, password });

    const response = await this.userRepository.create(data);

    return { id: response._id, username: dto.username, email: dto.email };
  }
}
