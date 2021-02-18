export interface TokenSignProvider<T = any> {
  decrypt(token: string): Promise<T>;
}
