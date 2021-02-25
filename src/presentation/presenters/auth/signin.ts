import { SigninDTO } from '@app/dtos/signin';
import { ServiceProtocol } from '@app/protocols/service';
import {
  badRequest,
  internalServerError,
  ok,
} from '@presentation/helpers/http-response';
import { HttpRequestProtocol } from '@presentation/protocols/http-request';
import { HttpResponseProtocol } from '@presentation/protocols/http-response';
import { PresenterProtocol } from '@presentation/protocols/presenter';

export class SigninPresenter implements PresenterProtocol<HttpRequestProtocol> {
  constructor(
    private readonly _signinService: ServiceProtocol<
      SigninDTO,
      Error[] | Error,
      string
    >
  ) {}

  async handle(request: HttpRequestProtocol): Promise<HttpResponseProtocol> {
    try {
      const tokenOrError = await this._signinService.execute(request.body);

      if (tokenOrError.isLeft()) {
        return badRequest(tokenOrError.value);
      }

      return ok({ token: tokenOrError.value, createdAt: new Date() });
    } catch ({ message }) {
      return internalServerError({ message });
    }
  }
}
