export interface TokenProviderProtocol<T = any> {
  encode(params: T): Promise<string>;
  decode(token: string): Promise<T>;
}
