export interface GatewayDisconnectProtocol<Params = any, Return = any> {
  disconnect(params?: Params): Promise<Return>;
}
