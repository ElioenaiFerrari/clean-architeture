import 'dotenv/config';
import dotenv from 'dotenv';
import { Either, left, right } from '@shared/result/either';
import { EnvNotFoundError } from '@shared/errors/env-not-found';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export class Env {
  static get(
    env: string,
    number?: boolean
  ): Either<EnvNotFoundError, string | number> {
    const envOrError = Env.validate(env);

    if (envOrError.isLeft()) {
      return left(envOrError.value);
    }

    if (number) return right(Number(envOrError.value));

    return right(envOrError.value);
  }

  private static validate(env: string): Either<EnvNotFoundError, string> {
    const value = process.env[env];

    if (!value) {
      return left(new EnvNotFoundError(env));
    }

    return right(value);
  }
}
