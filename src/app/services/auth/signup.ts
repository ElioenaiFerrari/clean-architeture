import { UserAlreadyExistsError } from '@app/errors/user-already-exists';
import { CreateRepositoryProtocol } from '@app/protocols/create-repository';
import { FindByEmailRepositoryProtocol } from '@app/protocols/find-by-email-repository';
import { HasherCompareProviderProtocol } from '@app/protocols/hasher-compare-provider';
import { HasherProviderProtocol } from '@app/protocols/hasher-provider';
import { PrimaryKeyProviderProtocol } from '@app/protocols/primary-key-provider';
import { ServiceProtocol } from '@app/protocols/service';
import { User } from '@domain/entities/user';
import { Either, left, right } from '@shared/result/either';
import { Logger } from '@shared/utils/logger';

export class SignupService
  implements ServiceProtocol<User, Error[] | Error, User> {
  constructor(
    private readonly _userRepository: CreateRepositoryProtocol<
      User,
      Error[],
      any
    > &
      FindByEmailRepositoryProtocol,
    private readonly _hasherProvider: HasherProviderProtocol &
      HasherCompareProviderProtocol,
    private readonly _idProvider: PrimaryKeyProviderProtocol
  ) {}

  async execute(params: User): Promise<Either<Error[] | Error, User>> {
    const userAlreadyExists = await this._userRepository.findByEmail(
      params.email
    );

    if (userAlreadyExists.isLeft()) {
      return left(new UserAlreadyExistsError());
    }

    const paramsOrError = User.create(params);

    if (paramsOrError.isLeft()) {
      return left(paramsOrError.value);
    }

    const id = await this._idProvider.make();
    const password = await this._hasherProvider.hash(params.password);

    const userOrError = await this._userRepository.create({
      ...params,
      id,
      password,
    });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    return right(userOrError.value);
  }
}
