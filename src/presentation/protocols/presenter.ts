import { HttpResponseProtocol } from './http-response';

export interface PresenterProtocol {
  handle(params: any): Promise<HttpResponseProtocol>;
}
