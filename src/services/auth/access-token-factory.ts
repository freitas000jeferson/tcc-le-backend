import { AccessTokenEntity } from 'src/entities/AccessToken.entity';
import { UserEntity } from 'src/entities/User.entity';
import { AccessToken } from 'src/model/mongo';

export type AccessTokenPayload = {
  email: string;
  sub: any;
};

export class AccessTokenFactory {
  static createPayload(user: UserEntity): AccessTokenPayload {
    return {
      email: user.email,
      sub: user.id,
    };
  }
  static saveToken(data: AccessTokenEntity): AccessToken {
    const response = new AccessToken();

    response.expired = data.expired;
    response.userId = data.userId;
    response.accessToken = data.accessToken;
    response.refreshToken = data.refreshToken;
    response.passwordResetToken = data.passwordResetToken;

    return response;
  }
}
