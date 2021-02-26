import jwt from 'jsonwebtoken';
import { User } from '@domain/entities/user';
import { TokenEncodeProviderProtocol } from '@app/protocols/token-encode-provider';
import { TokenDecodeProviderProtocol } from '@app/protocols/token-decode-provider';

export class JwtTokenProvider
  implements
    TokenEncodeProviderProtocol<any>,
    TokenDecodeProviderProtocol<any> {
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
