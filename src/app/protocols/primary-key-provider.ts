export interface PrimaryKeyProviderProtocol {
  make(): Promise<string | number>;
}
