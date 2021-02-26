export interface TokenDecodeProviderProtocol<T = any> {
  decode(token: string): Promise<T>;
}
