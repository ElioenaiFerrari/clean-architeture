export interface GatewayConnectProtocol<Params = any, Return = any> {
  connect(database: string, params?: Params): Promise<Return>;
}
