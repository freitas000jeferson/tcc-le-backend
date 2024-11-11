import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (
    req: Request,
    username: string,
    password: string
  ): Promise<boolean> => {
    const login = this.configService.get<string>('HTTP_BASIC_USER');
    const pass = this.configService.get<string>('HTTP_BASIC_PASS');
    if (login === username && pass === password) {
      return true;
    }
    throw new UnauthorizedException();
  };
}
