import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';

export const parseToInstance = <T, V>(
  cls: ClassConstructor<T>,
  plain: V[],
  options: ClassTransformOptions = { excludeExtraneousValues: true }
) => plainToInstance(cls, plain, options);
