import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { ServerParamsDTO, ServerProtocol } from '@main/protocols/server';
import { routesConfig } from './routes';
// import socketio from 'socket.io';

export class ExpressServer implements ServerProtocol<http.Server> {
  public readonly app: Express;
  public readonly server: http.Server;
  // public io: socketio.ExpressServer;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    // this.io = socketio(this.server);
  }

  middlewares(): void {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
  }

  routes(): void {
    routesConfig(this.app);
  }

  providers(): void {}

  start(params: ServerParamsDTO): void {
    this.middlewares();
    this.providers();
    this.routes();

    this.server.listen(params.port);
  }
}
