import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { ResourceNotFoundException } from 'src/commom/exceptions';
import {
  IUserRepository,
  USER_REPOSITORY_NAME,
} from 'src/repository/user/i-user.repository';
import { UserFactory } from '../user/user-factory';
import { AccessTokenFactory } from './access-token-factory';
import { CreateAccessTokenService } from './create-access-token.service';
import { VerifyPasswordService } from './verify-password.service';

@Injectable()
export class LoginService {
  constructor(
    @Inject(USER_REPOSITORY_NAME)
    private userRepository: IUserRepository,
    private createAccessTokenService: CreateAccessTokenService
  ) {}

  async handle(dto: LoginDto) {
    const userExists = await this.userRepository.findOne({
      email: dto.username,
    });
    if (!userExists) {
      throw new ResourceNotFoundException(`user:${dto.username}`);
    }

    await VerifyPasswordService.handle(dto.password, userExists.password);

    const payload = AccessTokenFactory.createPayload(
      UserFactory.parseUser(userExists)
    );

    return await this.createAccessTokenService.handle(payload, userExists._id);
  }
}
