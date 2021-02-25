import { Either } from '@shared/result/either';

export interface CreateRepositoryProtocol<T = any, L = any, R = any> {
  create(params: T): Promise<Either<L, R>>;
}
