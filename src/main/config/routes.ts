import { readdirSync } from 'fs';
import { Express, Router } from 'express';

export const routesConfig = (app: Express) => {
  const router = Router();
  app.use('/api/v1', router);

  readdirSync(`${__dirname}/../routes`).map(async (route) => {
    (await import(`../routes/${route}`)).default(router);
  });
};
