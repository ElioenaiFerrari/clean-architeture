import { CreateUserDTO } from '@app/dtos/create-user';
import { ServiceProtocol } from '@app/protocols/service';
import { User } from '@domain/entities/user';
import {
  badRequest,
  created,
  internalServerError,
} from '@presentation/helpers/http-response';
import { HttpResponseProtocol } from '@presentation/protocols/http-response';
import { PresenterProtocol } from '@presentation/protocols/presenter';

export class SignupPresenter implements PresenterProtocol {
  constructor(
    private readonly _signupService: ServiceProtocol<User, Error[] | Error, any>
  ) {}

  async handle(request: any): Promise<HttpResponseProtocol> {
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
