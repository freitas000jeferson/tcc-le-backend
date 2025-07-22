import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDocument } from 'src/model/mongo';
import { v4 as uuidv4 } from 'uuid'; // Adicione este import

import {
  IUserRepository,
  USER_REPOSITORY_NAME,
} from 'src/repository/user/i-user.repository';
import { MailService } from '../mail/mail.service';
import { ResourceNotFoundException } from 'src/commom/exceptions';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @Inject(USER_REPOSITORY_NAME)
    private userRepository: IUserRepository,
    private mailService: MailService
  ) {}

  async handle(email: string, validationCode?: string) {
    const userExists: UserDocument = await this.userRepository.findOne({
      email,
    });
    if (!userExists) {
      throw new ResourceNotFoundException('user');
    }
    if (validationCode) {
      if (
        !userExists.validationCode ||
        userExists.validationCode != validationCode
      ) {
        throw new UnauthorizedException();
      }
    }
    const code = this.generateVerificationCode();
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    userExists.resetCode = code;
    userExists.resetCodeExpires = expires;
    userExists.validationCode = validationCode ?? uuidv4();
    userExists.save();

    await this.mailService.sendResetCode(userExists.email, code);

    return {
      data: {
        validationCode: userExists.validationCode,
        message: 'Email enviado com sucesso.',
      },
    };
  }
  generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
