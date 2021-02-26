import { ServerProtocol } from '@app/protocols/server';
import { ExpressServerProvider } from '@infra/server/express-provider';

export const makeExpressServer = (): ServerProtocol => {
  return new ExpressServerProvider();
};
