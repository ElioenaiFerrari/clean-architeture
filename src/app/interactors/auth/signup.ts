import { CreateUserDTO } from '@app/dtos/create-user';
import { CreateRepositoryProtocol } from '@app/protocols/create-repository';
import { HasherCompareProviderProtocol } from '@app/protocols/hasher-compare-provider';
import { HasherProviderProtocol } from '@app/protocols/hasher-provider';
import { IDProviderProtocol } from '@app/protocols/id-provider';
import { InteractorProtocol } from '@app/protocols/interactor';
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
    private readonly _idProvider: IDProviderProtocol
  ) {}

  async execute(
    params: Omit<CreateUserDTO, 'id'>
  ): Promise<Either<Error[], User>> {
    const id = await this._idProvider.makeID();
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
