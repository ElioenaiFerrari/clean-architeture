import { MongoGateway } from '@infra/database/mongo';
import { ExpressServer } from '@main/adapters/express-server';

export const makeExpressServer = (): ExpressServer => {
  const databaseGateway = new MongoGateway('mongodb://localhost:27017');

  return new ExpressServer(databaseGateway);
};
