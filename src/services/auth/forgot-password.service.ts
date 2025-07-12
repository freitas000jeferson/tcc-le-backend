import { Inject, Injectable } from '@nestjs/common';
import { UserDocument } from 'src/model/mongo';

import {
  IUserRepository,
  USER_REPOSITORY_NAME,
} from 'src/repository/user/i-user.repository';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @Inject(USER_REPOSITORY_NAME)
    private userRepository: IUserRepository,
    private mailService: MailService
  ) {}

  async handle(email: string) {
    const userExists: UserDocument = await this.userRepository.findOne({
      email,
    });
    if (!userExists) {
      return { data: null, message: 'Usuário não encontrado.' };
    }
    const code = this.generateVerificationCode();
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    userExists.resetCode = code;
    userExists.resetCodeExpires = expires;
    userExists.save();

    await this.mailService.sendResetCode(userExists.email, code);

    return { data: true, message: 'Email enviado com sucesso.' };
  }
  generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  // async saveResetCode(email: string, code: string, expires: Date) {
  //   const user = this.userRepository.update(email);
  //   if (user) {
  //     user.resetCode = code;
  //     user.resetCodeExpires = expires;
  //   }
  // }
}
