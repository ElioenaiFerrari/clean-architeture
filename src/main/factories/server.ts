import { ExpressServer } from '@main/adapters/express-server';

export const makeExpressServer = (): ExpressServer => {
  return new ExpressServer();
};
