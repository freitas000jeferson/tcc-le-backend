import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from 'src/auth/dto/refresh-token.dto';
import { InvalidTokenException } from 'src/commom/exceptions';
import {
  ACCESS_TOKEN_REPOSITORY_NAME,
  IAccessTokenRepository,
} from 'src/repository/accessToken/i-access-token.repository';
import { UserGetByIdService } from '../user';
import { AccessTokenFactory } from './access-token-factory';
import { CreateAccessTokenService } from './create-access-token.service';

@Injectable()
export class RefreshTokenService {
  constructor(
    @Inject(ACCESS_TOKEN_REPOSITORY_NAME)
    private accessTokenRepository: IAccessTokenRepository,
    private createAccessTokenService: CreateAccessTokenService,
    private userGetByIdService: UserGetByIdService,
    private jwtService: JwtService
  ) {}

  async handle(dto: RefreshTokenDto) {
    const data = await this.jwtService.decode(dto.refreshToken, {});
    if (!data) {
      throw new InvalidTokenException();
    }
    const userId = data.sub;

    const accessTokenData = await this.accessTokenRepository.findOne({
      userId,
      accessToken: dto.accessToken,
      refreshToken: dto.refreshToken,
      expired: false,
    });
    if (!accessTokenData) {
      throw new InvalidTokenException();
    }

    accessTokenData.expired = true;
    await accessTokenData.save();

    const user = await this.userGetByIdService.handle(userId);

    const payload = AccessTokenFactory.createPayload({ ...user });

    return await this.createAccessTokenService.handle(payload, user.id);
  }
}
