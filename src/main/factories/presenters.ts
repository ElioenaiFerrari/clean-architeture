import { SignupInteractor } from '@app/interactors/auth/signup';
import { MongoUserRepository } from '@infra/database/mongo/repositories/user';
import { Argon2HasherProvider } from '@infra/hasher/argon2-provider';
import { BcryptHasherProvider } from '@infra/hasher/bcrypt-provider';
import { V4PrimaryKeyProvider } from '@infra/id/v4-provider';
import { SignupPresenter } from '@presentation/presenters/signup';
import { PresenterProtocol } from '@presentation/protocols/presenter';
import { server } from '..';

export const makeSignupPresenter = (): PresenterProtocol => {
  const { databaseConnection } = server;

  const userRepository = new MongoUserRepository(databaseConnection);
  const hasherProvider = new BcryptHasherProvider();
  const primaryKeyProvider = new V4PrimaryKeyProvider();
  const signupInteractor = new SignupInteractor(
    userRepository,
    hasherProvider,
    primaryKeyProvider
  );

  return new SignupPresenter(signupInteractor);
};
