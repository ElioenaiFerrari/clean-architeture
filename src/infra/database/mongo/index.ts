import mongoose, { ConnectionOptions, Connection } from 'mongoose';
import { GatewayConnectProtocol } from '@app/protocols/gateway-connect';
import { GatewayDisconnectProtocol } from '@app/protocols/gateway-disconnect';
import { Logger } from '@shared/utils/logger';

export class MongoGateway
  implements
    GatewayConnectProtocol<ConnectionOptions, typeof mongoose>,
    GatewayDisconnectProtocol {
  constructor(private readonly _baseURL: string) {}

  async connect(
    database: string,
    params: ConnectionOptions
  ): Promise<typeof mongoose> {
    const connectionUrl = `${this._baseURL}/${database}`;
    const connection = await mongoose.connect(connectionUrl, params);

    const isConnected = ({ connection }) => connection.readyState === 1;

    if (isConnected(connection)) {
      Logger.success(`[MONGO_CONNECTED] ${connectionUrl}`);
    } else {
      if (connection.connection.readyState === 1) {
        Logger.error(`[MONGO_ERROR]`);
      }
    }

    return connection;
  }

  async disconnect(params?: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
