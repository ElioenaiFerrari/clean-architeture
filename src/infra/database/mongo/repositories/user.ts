import mongoose from 'mongoose';
import { CreateUserDTO } from '@app/dtos/create-user';
import { CreateRepositoryProtocol } from '@app/protocols/create-repository';
import { Either, left, right } from '@shared/result/either';
import { Logger } from '@shared/utils/logger';

export class MongoUserRepository
  implements CreateRepositoryProtocol<CreateUserDTO, Error[], any> {
  constructor(private readonly _connection: typeof mongoose) {}

  async create(params: CreateUserDTO): Promise<Either<Error[], any>> {
    const userCollection = this._connection.connection.collection('users');
    const user = await userCollection.insertOne(params);

    if (!user) {
      return left(user);
    }

    return right(user.ops[0]);
  }
}
