import mongoose from 'mongoose';
import { CreateRepositoryProtocol } from '@app/protocols/create-repository';
import { Either, left, right } from '@shared/result/either';
import { Logger } from '@shared/utils/logger';
import { CreateUserDTO } from '@app/dtos/create-user';
import { FindByEmailRepositoryProtocol } from '@app/protocols/find-by-email-repository';

export class MongoUserRepository
  implements
    CreateRepositoryProtocol<CreateUserDTO, Error[], any>,
    FindByEmailRepositoryProtocol {
  constructor(private readonly _connection: typeof mongoose) {}
  async findByEmail(email: string): Promise<Either<any, any>> {
    const userCollection = this._connection.connection.collection('users');
    const user = await userCollection.findOne({ email });

    if (user) {
      return left(user);
    }

    return right(user);
  }

  async create(params: CreateUserDTO): Promise<Either<Error[], any>> {
    const userCollection = this._connection.connection.collection('users');
    const user = await userCollection.insertOne(params);

    if (!user) {
      return left(user);
    }

    return right(user.ops[0]);
  }
}
