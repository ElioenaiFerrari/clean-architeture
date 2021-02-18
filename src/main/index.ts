import 'module-alias/register';
import { Env } from '@shared/utils/env';
import { ServerFactory } from './factories/server';
import { Logger } from '@shared/utils/logger';

const PORT = Env.get('PORT');

const server = ServerFactory.makeExpressServer();

if (PORT.isRight()) {
  server.start({ port: PORT.value });

  Logger.success(`[SERVER ONLINE] http://localhost:${PORT.value}`);
} else {
  Logger.error(`[SERVER ERROR] ${PORT.value.message}`);
}
