import { MaxLengthError } from '@domain/errors/max-length';
import { MinLengthError } from '@domain/errors/min-length';
import { Either, left, right } from '@shared/result/either';

export class Username {
  private constructor(public readonly value: string) {}

  static create(
    value: string,
    min: number = 3,
    max: number = 15
  ): Either<MinLengthError | MaxLengthError, Username> {
    const usernameOrError = this._validate(value, min, max);

    if (usernameOrError.isLeft()) {
      return left(usernameOrError.value);
    }

    return right(new Username(usernameOrError.value));
  }

  private static _validate(
    value: string,
    min: number = 3,
    max: number = 15
  ): Either<MinLengthError | MaxLengthError, string> {
    if (!value || value.length < min) {
      return left(new MinLengthError('username', min));
    } else if (value.length > max) {
      return left(new MaxLengthError('username', max));
    }

    return right(value);
  }
}
