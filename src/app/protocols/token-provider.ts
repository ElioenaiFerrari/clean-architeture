export interface TokenProviderProtocol<T> {
  encrypt(params: T): Promise<string>;
  decrypt(token: string): Promise<T>;
}
