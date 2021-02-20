import jwt from 'jsonwebtoken';
import { TokenProviderProtocol } from '@app/protocols/token-provider';
import { User } from '@domain/entities/user';

export class JwtTokenProvider implements TokenProviderProtocol<any> {
  constructor(private readonly _secret: string) {}

  async encode(params: User): Promise<string> {
    return jwt.sign(params, this._secret, {
      algorithm: 'HS256',
      expiresIn: '1h',
    });
  }

  async decode(token: string): Promise<any> {
    return jwt.verify(token, this._secret, { algorithms: ['HS256'] });
  }
}
