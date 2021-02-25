import { SigninDTO } from '@app/dtos/signin';
import { InvalidCredentialsError } from '@app/errors/invalid-credentials';
import { NotFoundError } from '@app/errors/not-found';
import { FindByEmailRepositoryProtocol } from '@app/protocols/find-by-email-repository';
import { HasherCompareProviderProtocol } from '@app/protocols/hasher-compare-provider';
import { ServiceProtocol } from '@app/protocols/service';
import { TokenProviderProtocol } from '@app/protocols/token-provider';
import { User } from '@domain/entities/user';
import { Either, left, right } from '@shared/result/either';

export class SigninService
  implements ServiceProtocol<SigninDTO, Error[] | Error, string> {
  constructor(
    private readonly _usersRepository: FindByEmailRepositoryProtocol<any, User>,
    private readonly _hasherProvider: HasherCompareProviderProtocol,
    private readonly _tokenProvider: TokenProviderProtocol<User>
  ) {}

  async execute(params: SigninDTO): Promise<Either<Error | Error[], string>> {
    const userOrError = await this._usersRepository.findByEmail(params.email);

    if (userOrError?.isLeft()) {
      return left(new NotFoundError('user not found'));
    }

    const isValidPassword = await this._hasherProvider.compare(
      params.password,
      userOrError.value.password
    );

    if (!isValidPassword) {
      return left(new InvalidCredentialsError());
    }

    const token = await this._tokenProvider.encode(userOrError.value);

    return right(token);
  }
}
