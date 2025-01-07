import { Injectable, UnauthorizedException } from '@nestjs/common';

import { FindAccessTokenService } from 'src/services/auth/find-access-token.service';
import { FindOneUserService } from 'src/services/user/find-one-user.service';
import {
  AuthMissingException,
  ResourceNotFoundException,
} from 'src/commom/exceptions';
import { WsException } from '@nestjs/websockets';

type TypeRequestProps = 'ws' | 'http' | 'rpc';
@Injectable()
export class AuthorizationService {
  constructor(
    private findAccessTokenService: FindAccessTokenService,
    private findOneUserService: FindOneUserService
  ) {}
  async handle(token?: string, type: TypeRequestProps = 'http') {
    if (!token) {
      if (type === 'http') throw new AuthMissingException();
      else throw new WsException(`missing-authorization-header`);
    }

    // Se existe token salvo no banco
    const existToken = await this.findAccessTokenService.handle({
      accessToken: token,
      expired: false,
    });

    if (!existToken) {
      if (type === 'http') throw new ResourceNotFoundException('token');
      else throw new WsException(`token-not-found`);
    }

    // Se o usuário nao esta ativo
    const existUser = await this.findOneUserService.handle({
      _id: existToken.userId,
    });

    if (!existUser?.isActive) {
      if (type === 'http') throw new UnauthorizedException();
      else throw new WsException(`unauthorized`);
    }
    console.log(
      'PASSOU no Authorization\n',
      JSON.stringify(existUser, null, 2)
    );
    return true;
  }
}
