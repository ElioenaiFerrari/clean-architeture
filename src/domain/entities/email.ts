import { InvalidFormatError } from '@domain/errors/invalid-format';
import { Either, left, right } from '@shared/result/either';

export class Email {
  private constructor(public readonly value: string) {}

  static create(value: string): Either<InvalidFormatError, Email> {
    const emailOrError = this._validate(value);

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    return right(new Email(emailOrError.value));
  }

  private static _validate(value: string): Either<InvalidFormatError, string> {
    if (!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/.test(value)) {
      return left(new InvalidFormatError('email', value));
    }

    return right(value);
  }
}
