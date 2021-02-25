import { FindAllRepositoryProtocol } from '@app/protocols/find-all-repository';
import { ServiceProtocol } from '@app/protocols/service';
import { User } from '@domain/entities/user';
import { Either, left, right } from '@shared/result/either';

export class FindAllUsersService
  implements ServiceProtocol<any, Error[] | Error, User[]> {
  constructor(
    private readonly _usersRepository: FindAllRepositoryProtocol<
      any,
      Error[],
      User[]
    >
  ) {}

  async execute(params: any): Promise<Either<Error | Error[], User[]>> {
    const users = await this._usersRepository.findAll(params);

    if (users.isLeft()) {
      return left(users.value);
    }

    return right(users.value);
  }
}
