import { CreateUserDTO } from '@app/dtos/create-user';
import { CreateRepositoryProtocol } from '@app/protocols/create-repository';
import { HasherCompareProviderProtocol } from '@app/protocols/hasher-compare-provider';
import { HasherProviderProtocol } from '@app/protocols/hasher-provider';
import { InteractorProtocol } from '@app/protocols/interactor';
import { PrimaryKeyProviderProtocol } from '@app/protocols/primary-key-provider';
import { User } from '@domain/entities/user';
import { Either, left, right } from '@shared/result/either';

export class SignupInteractor
  implements InteractorProtocol<CreateUserDTO, Error[], User> {
  constructor(
    private readonly _createUserRepository: CreateRepositoryProtocol<
      CreateUserDTO,
      Error[],
      User
    >,
    private readonly _hasherProvider: HasherProviderProtocol &
      HasherCompareProviderProtocol,
    private readonly _idProvider: PrimaryKeyProviderProtocol
  ) {}

  async execute(params: CreateUserDTO): Promise<Either<Error[], User>> {
    const id = await this._idProvider.make();
    const password = await this._hasherProvider.hash(params.password);

    const userOrError = await this._createUserRepository.create({
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
