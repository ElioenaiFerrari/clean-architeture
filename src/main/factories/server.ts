import http from 'http';
import { ServerProtocol } from '@main/protocols/server';
import { ExpressServer } from '@main/config/express-server';

export class ServerFactory {
  static makeExpressServer(): ServerProtocol<http.Server> {
    return new ExpressServer();
  }
}
