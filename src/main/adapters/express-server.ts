import '@main/config/database';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import http from 'http';
import { ServerParamsDTO, ServerProtocol } from '@main/protocols/server';
import { routesConfig } from '@main/router';
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

  async middlewares(): Promise<void> {
    this.app.use(cors({ origin: '*' }));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
  }

  async routes(): Promise<void> {
    routesConfig(this.app);
  }

  async providers(): Promise<void> {}

  async start(params: ServerParamsDTO): Promise<void> {
    await this.middlewares();
    await this.providers();
    await this.routes();

    this.server.listen(params.port);
  }
}
