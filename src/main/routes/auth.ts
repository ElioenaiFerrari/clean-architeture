import { expressRouterAdapter } from '@main/adapters/express-router';
import { makeSignupPresenter } from '@main/factories/presenters';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/auth/signup', expressRouterAdapter(makeSignupPresenter()));
};
