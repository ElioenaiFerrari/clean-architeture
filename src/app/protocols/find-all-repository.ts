import { Either } from '@shared/result/either';

export interface FindAllRepositoryProtocol<T = any, L = any, R = any> {
  findAll(query: T): Promise<Either<L, R>>;
}
