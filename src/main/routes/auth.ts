import { expressRouterAdapter } from '@main/adapters/express-router';
import {
  makeSigninPresenter,
  makeSignupPresenter,
} from '@main/factories/presenters/auth';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/auth/signup', expressRouterAdapter(makeSignupPresenter()));
  router.post('/auth/signin', expressRouterAdapter(makeSigninPresenter()));
};
