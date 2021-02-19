import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { ServerParamsDTO, ServerProtocol } from '@main/protocols/server';
import { GatewayConnectProtocol } from '@app/protocols/gateway-connect';
import { GatewayDisconnectProtocol } from '@app/protocols/gateway-disconnect';
import mongoose, { ConnectionOptions } from 'mongoose';
import { routesConfig } from '@main/config/routes';
// import socketio from 'socket.io';

export class ExpressServer implements ServerProtocol<http.Server> {
  public readonly app: Express;
  public readonly server: http.Server;
  public databaseConnection!: typeof mongoose;
  // public io: socketio.ExpressServer;

  constructor(
    private readonly _databaseGateway: GatewayConnectProtocol<
      ConnectionOptions,
      typeof mongoose
    > &
      GatewayDisconnectProtocol
  ) {
    this.app = express();
    this.server = http.createServer(this.app);

    // this.io = socketio(this.server);
  }

  async middlewares(): Promise<void> {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
  }

  async routes(): Promise<void> {
    routesConfig(this.app);
  }

  async providers(): Promise<void> {
    this.databaseConnection = await this._databaseGateway.connect(
      'clean-architeture',
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }

  async start(params: ServerParamsDTO): Promise<void> {
    await this.middlewares();
    await this.providers();
    await this.routes();

    this.server.listen(params.port);
  }
}
