import { Either } from '@shared/result/either';

export interface FindByEmailRepositoryProtocol<L = any, R = any> {
  findByEmail(email: string): Promise<Either<L, R>>;
}
