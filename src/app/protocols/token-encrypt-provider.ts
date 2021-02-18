export interface TokenSignProvider<T = any> {
  encrypt(params: T): Promise<string>;
}
