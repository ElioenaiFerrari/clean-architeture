export interface HasherCompareProviderProtocol {
  compare(password: string, hash: string): Promise<boolean>;
}
