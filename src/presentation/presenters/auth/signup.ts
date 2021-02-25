import { CreateUserDTO } from '@app/dtos/create-user';
import { ServiceProtocol } from '@app/protocols/service';
import {
  badRequest,
  created,
  internalServerError,
} from '@presentation/helpers/http-response';
import { HttpRequestProtocol } from '@presentation/protocols/http-request';
import { HttpResponseProtocol } from '@presentation/protocols/http-response';
import { PresenterProtocol } from '@presentation/protocols/presenter';

export class SignupPresenter implements PresenterProtocol<HttpRequestProtocol> {
  constructor(
    private readonly _signupService: ServiceProtocol<
      CreateUserDTO,
      Error[] | Error,
      any
    >
  ) {}

  async handle(request: HttpRequestProtocol): Promise<HttpResponseProtocol> {
    try {
      const userOrError = await this._signupService.execute(request.body);

      if (userOrError.isLeft()) {
        return badRequest(userOrError.value);
      }

      return created(userOrError.value);
    } catch ({ message }) {
      return internalServerError({ message });
    }
  }
}
