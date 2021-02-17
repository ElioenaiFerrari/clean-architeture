export interface IDProviderProtocol {
  makeID(): Promise<string | number>;
}
