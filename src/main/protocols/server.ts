export interface ServerParamsDTO {
  port: number | string;
  // socketHandler(params: any): Promise<void>;
}

export interface ServerProtocol<T = any> {
  middlewares(): Promise<void>;
  routes(): Promise<void>;
  providers(): Promise<void>;
  start(params: ServerParamsDTO): Promise<void>;
}
