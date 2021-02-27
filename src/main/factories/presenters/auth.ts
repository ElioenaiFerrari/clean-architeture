import { SigninService } from '@app/services/auth/signin';
import { SignupService } from '@app/services/auth/signup';
import { MongoUsersRepository } from '@infra/database/mongo/repositories/users';
import { Argon2HasherProvider } from '@infra/hasher/argon2-provider';
import { V4PrimaryKeyProvider } from '@infra/id/v4-provider';
import { JwtTokenProvider } from '@infra/token/jwt-provider';
import { cleanArchitetureConnection } from '@main/config/database';
import { SigninPresenter } from '@presentation/presenters/auth/signin';
import { SignupPresenter } from '@presentation/presenters/auth/signup';
import { HttpRequestProtocol } from '@presentation/protocols/http-request';
import { PresenterProtocol } from '@presentation/protocols/presenter';

export const makeSignupPresenter = async (): Promise<
  PresenterProtocol<HttpRequestProtocol>
> => {
  const usersRepository = new MongoUsersRepository(
    await cleanArchitetureConnection
  );
  const hasherProvider = new Argon2HasherProvider();
  const primaryKeyProvider = new V4PrimaryKeyProvider();
  const signupService = new SignupService(
    usersRepository,
    hasherProvider,
    primaryKeyProvider
  );

  return new SignupPresenter(signupService);
};

export const makeSigninPresenter = async (): Promise<
  PresenterProtocol<HttpRequestProtocol>
> => {
  const usersRepository = new MongoUsersRepository(
    await cleanArchitetureConnection
  );
  const hasherProvider = new Argon2HasherProvider();
  const tokenProvider = new JwtTokenProvider('clean-architeture');
  const signinService = new SigninService(
    usersRepository,
    hasherProvider,
    tokenProvider
  );

  return new SigninPresenter(signinService);
};
