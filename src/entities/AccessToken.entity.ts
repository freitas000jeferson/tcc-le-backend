export class AccessTokenEntity {
  id?: string;
  expired: boolean;
  passwordResetToken?: string;
  accessToken?: string;
  refreshToken?: string;
  userId: any;
  createdAt?: Date;
  updatedAt?: Date;
}
