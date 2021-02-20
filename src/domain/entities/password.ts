import { MaxLengthError } from '@domain/errors/max-length';
import { MinLengthError } from '@domain/errors/min-length';
import { Either, left, right } from '@shared/result/either';
import { Logger } from '@shared/utils/logger';

export class Password {
  private constructor(public readonly value: string) {}

  static create(
    value: string,
    min: number = 6,
    max: number = 15
  ): Either<MinLengthError | MaxLengthError, Password> {
    const passwordOrError = this._validate(value, min, max);

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    return right(new Password(passwordOrError.value));
  }

  private static _validate(
    value: string,
    min: number,
    max: number
  ): Either<MinLengthError | MaxLengthError, string> {
    if (!value || value.length < min) {
      return left(new MinLengthError('password', min));
    } else if (value.length > max) {
      return left(new MaxLengthError('password', max));
    }

    return right(value);
  }
}
