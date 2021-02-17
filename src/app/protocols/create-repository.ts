import { Either } from '@shared/result/either';

export interface CreateRepositoryProtocol<Params = any, L = any, R = any> {
  create(params: Params): Promise<Either<L, R>>;
}
