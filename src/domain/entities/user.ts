import { DomainError } from '@domain/errors/domain';
import { Either, left, right } from '@shared/result/either';
import { Result } from '@shared/result/result';
import { Email } from './email';
import { Password } from './password';
import { Username } from './username';

export class User {
  private constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly id?: string | number
  ) {}

  public static create(params: User): Either<Error[], User> {
    const usernameOrError = Username.create(params.username);
    const emailOrError = Email.create(params.email);
    const passwordOrError = Password.create(params.password);

    const resultOrError = Result.combine([
      usernameOrError,
      emailOrError,
      passwordOrError,
    ]);

    if (resultOrError?.isLeft()) {
      return left(resultOrError.value);
    }

    const [username, email, password] = resultOrError.value;

    return right(new User(username, email, password, params.id));
  }
}
