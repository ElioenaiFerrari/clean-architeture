import { Router } from 'express';
import { expressRouterAdapter } from '@main/adapters/express-router';
import { makeFindAllUsersPresenter } from '@main/factories/presenters/users';

export default async (router: Router): Promise<void> => {
  router.get('/users', expressRouterAdapter(await makeFindAllUsersPresenter()));
};
