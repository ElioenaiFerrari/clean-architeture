import { SignupInteractor } from '@app/interactors/auth/signup';
import { MongoUserRepository } from '@infra/database/mongo/repositories/user';
import { Argon2HasherProvider } from '@infra/hasher/argon2-provider';
import { UUIDPrimaryKeyProvider } from '@infra/id/uuid-provider';
import { SignupPresenter } from '@presentation/presenters/signup';
import { PresenterProtocol } from '@presentation/protocols/presenter';
import { server } from '..';

export const makeSignupPresenter = (): PresenterProtocol => {
  const { databaseConnection } = server;

  console.log(databaseConnection);

  const userRepository = new MongoUserRepository(databaseConnection);
  const hasherProvider = new Argon2HasherProvider();
  const primaryKeyProvider = new UUIDPrimaryKeyProvider();
  const signupInteractor = new SignupInteractor(
    userRepository,
    hasherProvider,
    primaryKeyProvider
  );

  return new SignupPresenter(signupInteractor);
};
