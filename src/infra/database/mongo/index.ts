import mongoose, { ConnectionOptions, Connection } from 'mongoose';
import { GatewayConnectProtocol } from '@app/protocols/gateway-connect';
import { GatewayDisconnectProtocol } from '@app/protocols/gateway-disconnect';
import { Logger } from '@shared/utils/logger';

export class MongoGateway
  implements
    GatewayConnectProtocol<ConnectionOptions, typeof mongoose>,
    GatewayDisconnectProtocol {
  private _connection?: typeof mongoose;

  constructor(private readonly _baseURL: string) {}

  async connect(
    database: string,
    params: ConnectionOptions
  ): Promise<typeof mongoose> {
    const connectionUrl = `${this._baseURL}/${database}`;
    this._connection = await mongoose.connect(connectionUrl, params);

    const isConnected = () => this._connection?.connection.readyState === 1;

    if (isConnected()) {
      Logger.success(`[MONGO_CONNECTED] ${connectionUrl}`);
    } else {
      if (this._connection.connection.readyState === 1) {
        Logger.error(`[MONGO_ERROR]`);
      }
    }

    return this._connection;
  }

  async disconnect(params?: any): Promise<any> {
    await this._connection?.disconnect();
    this._connection = undefined;
  }
}
