export interface HasherProviderProtocol {
  hash(password: string): Promise<string>;
}
