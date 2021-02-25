import { Either } from '@shared/result/either';

export interface ServiceProtocol<T = any, L = any, R = any> {
  execute(params: T): Promise<Either<L, R>>;
}
