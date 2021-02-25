import { FindAllUsersService } from '@app/services/users/find-all';
import { MongoUsersRepository } from '@infra/database/mongo/repositories/users';
import { cleanArchitetureConnection } from '@main/config/database';
import { FindAllUsersPresenter } from '@presentation/presenters/users/find-all';
import { HttpRequestProtocol } from '@presentation/protocols/http-request';
import { PresenterProtocol } from '@presentation/protocols/presenter';

export const makeFindAllUsersPresenter = async (): Promise<
  PresenterProtocol<HttpRequestProtocol>
> => {
  const usersRepository = new MongoUsersRepository(
    await cleanArchitetureConnection
  );
  const findAllUsersService = new FindAllUsersService(usersRepository);

  return new FindAllUsersPresenter(findAllUsersService);
};
