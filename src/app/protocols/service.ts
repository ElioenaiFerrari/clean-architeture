import { Either } from '@shared/result/either';

export interface ServiceProtocol<Params = any, L = any, R = any> {
  execute(params: Params): Promise<Either<L, R>>;
}
