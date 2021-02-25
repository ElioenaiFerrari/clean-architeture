import { ServiceProtocol } from '@app/protocols/service';
import { HttpResponseProtocol } from '@presentation/protocols/http-response';
import { HttpRequestProtocol } from '@presentation/protocols/http-request';
import { PresenterProtocol } from '@presentation/protocols/presenter';
import {
  badRequest,
  internalServerError,
  ok,
} from '@presentation/helpers/http-response';

export class FindAllUsersPresenter
  implements PresenterProtocol<HttpRequestProtocol> {
  constructor(private readonly _findAllUsersService: ServiceProtocol) {}

  async handle(request: HttpRequestProtocol): Promise<HttpResponseProtocol> {
    try {
      const usersOrError = await this._findAllUsersService.execute(
        request.query
      );

      if (usersOrError?.isLeft()) {
        return badRequest(usersOrError.value);
      }

      return ok(usersOrError.value);
    } catch ({ message }) {
      return internalServerError({ message });
    }
  }
}
