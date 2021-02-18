export interface ServerParamsDTO {
  port: number | string;
  // socketHandler(params: any): Promise<void>;
}

export interface ServerProtocol<T = any> {
  middlewares(): void;
  routes(): void;
  providers(): Promise<void>;
  start(params: ServerParamsDTO): void;
}
