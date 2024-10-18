import { ModelDefinition } from '@nestjs/mongoose';
import { AccessToken, AccessTokenSchema, User, UserSchema } from './index';

export const ModelDefinitions: Record<string, ModelDefinition> = {
  User: { name: User.name, schema: UserSchema },
  AccessToken: { name: AccessToken.name, schema: AccessTokenSchema },
} as const;
