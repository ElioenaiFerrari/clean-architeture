import { CreateUserDTO } from '@app/dtos/create-user';
import { AlreadyExistsError } from '@app/errors/already-exists';
import { CreateRepositoryProtocol } from '@app/protocols/create-repository';
import { FindByEmailRepositoryProtocol } from '@app/protocols/find-by-email-repository';
import { HasherCompareProviderProtocol } from '@app/protocols/hasher-compare-provider';
import { HasherProviderProtocol } from '@app/protocols/hasher-provider';
import { PrimaryKeyProviderProtocol } from '@app/protocols/primary-key-provider';
import { ServiceProtocol } from '@app/protocols/service';
import { User } from '@domain/entities/user';
import { Either, left, right } from '@shared/result/either';

export class SignupService
  implements ServiceProtocol<CreateUserDTO, Error[] | Error, User> {
  constructor(
    private readonly _usersRepository: CreateRepositoryProtocol<
      User,
      Error[],
      any
    > &
      FindByEmailRepositoryProtocol,
    private readonly _hasherProvider: HasherProviderProtocol &
      HasherCompareProviderProtocol,
    private readonly _idProvider: PrimaryKeyProviderProtocol
  ) {}

  async execute(params: CreateUserDTO): Promise<Either<Error[] | Error, User>> {
    const userAlreadyExists = await this._usersRepository.findByEmail(
      params.email
    );

    if (userAlreadyExists.isRight()) {
      return left(new AlreadyExistsError('user already exists'));
    }

    const paramsOrError = User.create(params);

    if (paramsOrError.isLeft()) {
      return left(paramsOrError.value);
    }

    const id = await this._idProvider.make();
    const password = await this._hasherProvider.hash(params.password);

    const userOrError = await this._usersRepository.create({
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
