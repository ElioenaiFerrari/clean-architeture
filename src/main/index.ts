import 'module-alias/register';
import { Env } from '@shared/utils/env';
import { makeExpressServer } from './factories/server';
import { Logger } from '@shared/utils/logger';

const PORT = Env.get('PORT');

const server = makeExpressServer();

if (PORT.isRight()) {
  server.start({ port: PORT.value }).then(() => {
    Logger.success(`[SERVER_ONLINE] http://localhost:${PORT.value}`);
  });
} else {
  Logger.error(`[SERVER_ERROR] ${PORT.value.message}`);
}
export { server };
