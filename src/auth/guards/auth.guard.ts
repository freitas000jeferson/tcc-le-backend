import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  AuthMissingException,
  ResourceNotFoundException,
} from 'src/commom/exceptions';
import { FindAccessTokenService } from 'src/services/auth/find-access-token.service';
import { FindOneUserService } from 'src/services/user/find-one-user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private findAccessTokenService: FindAccessTokenService,
    private findOneUserService: FindOneUserService
  ) {}

  async canActivate(context: ExecutionContext) {
    // Se a request é publica: ja retorna
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    // Se é um token válido
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new AuthMissingException();
    }

    // Se existe token salvo no banco
    const existToken = await this.findAccessTokenService.handle({
      accessToken: token,
      expired: false,
    });

    if (!existToken) {
      throw new ResourceNotFoundException('token');
    }

    // Se o usuário nao esta ativo
    const existUser = await this.findOneUserService.handle({
      _id: existToken.userId,
    });

    if (!existUser?.isActive) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
