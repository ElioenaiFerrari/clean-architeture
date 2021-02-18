import { CreateUserDTO } from '@app/dtos/create-user';
import { InteractorProtocol } from '@app/protocols/interactor';
import {
  badRequest,
  created,
  internalServerError,
  ok,
} from '@presentation/helpers/http-response';
import { HttpResponseProtocol } from '@presentation/protocols/http-response';
import { PresenterProtocol } from '@presentation/protocols/presenter';

export class SignupPresenter implements PresenterProtocol {
  constructor(
    private readonly _signupInteractor: InteractorProtocol<
      CreateUserDTO,
      Error[],
      any
    >
  ) {}

  async handle(request: any): Promise<HttpResponseProtocol> {
    try {
      const userOrError = await this._signupInteractor.execute(request.body);

      if (userOrError.isLeft()) {
        return badRequest(userOrError.value);
      }

      return created(userOrError.value);
    } catch ({ message }) {
      return internalServerError({ message });
    }
  }
}
