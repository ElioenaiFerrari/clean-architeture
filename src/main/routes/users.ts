import { Router } from 'express';
import { expressRouterAdapter } from '@infra/router/express-router';
import { makeFindAllUsersPresenter } from '@main/factories/presenters/users';

export default async (router: Router): Promise<void> => {
  router.get('/users', expressRouterAdapter(await makeFindAllUsersPresenter()));
};
