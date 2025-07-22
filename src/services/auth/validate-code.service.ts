import { Inject, Injectable } from '@nestjs/common';
import { UserDocument } from 'src/model/mongo';

import {
  IUserRepository,
  USER_REPOSITORY_NAME,
} from 'src/repository/user/i-user.repository';
import { ValidateCodeAndEmailDto } from 'src/auth/dto/validate-code-and-email.dto';
import { ResourceNotFoundException } from 'src/commom/exceptions';

@Injectable()
export class ValidateCodeService {
  constructor(
    @Inject(USER_REPOSITORY_NAME)
    private userRepository: IUserRepository
  ) {}

  async handle({ email, code, validationCode }: ValidateCodeAndEmailDto) {
    const userExists: UserDocument = await this.userRepository.findOne({
      email,
    });
    if (!userExists) {
      throw new ResourceNotFoundException('user');
    }
    const codeIsValid =
      userExists.resetCode === code &&
      userExists.validationCode === validationCode &&
      userExists.resetCodeExpires < new Date();
    return { codeIsValid };
  }
}
