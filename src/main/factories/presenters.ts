import { SignupInteractor } from '@app/interactors/auth/signup';
import { SignupPresenter } from '@presentation/presenters/signup';
import { PresenterProtocol } from '@presentation/protocols/presenter';

export const makeSignupPresenter = (): PresenterProtocol => {
  const signupInteractor = new SignupInteractor();

  return new SignupPresenter(signupInteractor);
};
