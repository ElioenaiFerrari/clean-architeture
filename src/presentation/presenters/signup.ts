import { InteractorProtocol } from '@app/protocols/interactor';
import { HttpResponseProtocol } from '@presentation/protocols/http-response';
import { PresenterProtocol } from '@presentation/protocols/presenter';

export class SignupPresenter implements PresenterProtocol {
  constructor(private readonly _signupInteractor: InteractorProtocol) {}

  handle(params: any): Promise<HttpResponseProtocol> {
    throw new Error('Method not implemented.');
  }
}
