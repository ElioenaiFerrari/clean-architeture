import { SigninService } from '@app/services/auth/signin';
import { SignupService } from '@app/services/auth/signup';
import { MongoUserRepository } from '@infra/database/mongo/repositories/user';
import { Argon2HasherProvider } from '@infra/hasher/argon2-provider';
import { V4PrimaryKeyProvider } from '@infra/id/v4-provider';
import { JwtTokenProvider } from '@infra/token/jwt';
import { server } from '@main/index';
import { SigninPresenter } from '@presentation/presenters/signin';
import { SignupPresenter } from '@presentation/presenters/signup';
import { PresenterProtocol } from '@presentation/protocols/presenter';

export const makeSignupPresenter = (): PresenterProtocol => {
  const { databaseConnection } = server;

  const userRepository = new MongoUserRepository(databaseConnection);
  const hasherProvider = new Argon2HasherProvider();
  const primaryKeyProvider = new V4PrimaryKeyProvider();
  const signupService = new SignupService(
    userRepository,
    hasherProvider,
    primaryKeyProvider
  );

  return new SignupPresenter(signupService);
};

export const makeSigninPresenter = (): PresenterProtocol => {
  const { databaseConnection } = server;

  const userRepository = new MongoUserRepository(databaseConnection);
  const hasherProvider = new Argon2HasherProvider();
  const tokenProvider = new JwtTokenProvider('clean-architeture');
  const signinService = new SigninService(
    userRepository,
    hasherProvider,
    tokenProvider
  );

  return new SigninPresenter(signinService);
};
