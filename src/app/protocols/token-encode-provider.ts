export interface TokenEncodeProviderProtocol<T = any> {
  encode(params: T): Promise<string>;
}
