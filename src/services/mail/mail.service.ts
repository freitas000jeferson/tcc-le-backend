import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendCodeTemplate } from './send-code.template';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetCode(to: string, code: string) {
    const html = SendCodeTemplate.replace('{{code}}', code);

    return await this.mailerService.sendMail({
      to,
      subject: 'Recuperação de senha',
      text: `Seu código de verificação é: ${code}`,
      html,
    });
  }
}
