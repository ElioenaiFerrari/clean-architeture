import { CreateUserDTO } from '@app/dtos/create-user';
import { SigninDTO } from '@app/dtos/signin';
import { ServiceProtocol } from '@app/protocols/service';
import { User } from '@domain/entities/user';
import {
  badRequest,
  created,
  internalServerError,
  ok,
} from '@presentation/helpers/http-response';
import { HttpResponseProtocol } from '@presentation/protocols/http-response';
import { PresenterProtocol } from '@presentation/protocols/presenter';

export class SigninPresenter implements PresenterProtocol {
  constructor(
    private readonly _signinService: ServiceProtocol<
      SigninDTO,
      Error[] | Error,
      string
    >
  ) {}

  async handle(request: any): Promise<HttpResponseProtocol> {
    try {
      const tokenOrError = await this._signinService.execute(request.body);

      if (tokenOrError.isLeft()) {
        return badRequest(tokenOrError.value);
      }

      console.log(ok({ token: tokenOrError.value, createdAt: new Date() }));

      return ok({ token: tokenOrError.value, createdAt: new Date() });
    } catch ({ message }) {
      return internalServerError({ message });
    }
  }
}
