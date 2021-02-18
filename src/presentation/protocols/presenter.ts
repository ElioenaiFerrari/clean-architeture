import { HttpResponseProtocol } from './http-response';

export interface PresenterProtocol<T = any> {
  handle(request: T): Promise<HttpResponseProtocol>;
}
