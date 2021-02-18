import argon2 from 'argon2';
import { HasherCompareProviderProtocol } from '@app/protocols/hasher-compare-provider';
import { HasherProviderProtocol } from '@app/protocols/hasher-provider';

export class Argon2HasherProvider
  implements HasherProviderProtocol, HasherCompareProviderProtocol {
  async hash(password: string): Promise<string> {
    const hash = await argon2.hash(password);

    return hash;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const isValid = await argon2.verify(hash, password);

    return isValid;
  }
}
