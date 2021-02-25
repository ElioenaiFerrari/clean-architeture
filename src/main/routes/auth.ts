import { Router } from 'express';
import { expressRouterAdapter } from '@main/adapters/express-router';
import {
  makeSigninPresenter,
  makeSignupPresenter,
} from '@main/factories/presenters/auth';

export default async (router: Router): Promise<void> => {
  router.post(
    '/auth/signup',
    expressRouterAdapter(await makeSignupPresenter())
  );
  router.post(
    '/auth/signin',
    expressRouterAdapter(await makeSigninPresenter())
  );
};
