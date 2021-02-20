import { SignupService } from '@app/services/auth/signup';
import { MongoUserRepository } from '@infra/database/mongo/repositories/user';
import { Argon2HasherProvider } from '@infra/hasher/argon2-provider';
import { V4PrimaryKeyProvider } from '@infra/id/v4-provider';
import { server } from '@main/index';
import { SignupPresenter } from '@presentation/presenters/signup';
import { PresenterProtocol } from '@presentation/protocols/presenter';

export const makeSignupPresenter = (): PresenterProtocol => {
  const { databaseConnection } = server;

  const userRepository = new MongoUserRepository(databaseConnection);
  const hasherProvider = new Argon2HasherProvider();
  const primaryKeyProvider = new V4PrimaryKeyProvider();
  const signupInteractor = new SignupService(
    userRepository,
    userRepository,
    hasherProvider,
    primaryKeyProvider
  );

  return new SignupPresenter(signupInteractor);
};
