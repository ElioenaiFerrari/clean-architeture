import bcrypt from 'bcryptjs';
import { HasherCompareProviderProtocol } from '@app/protocols/hasher-compare-provider';
import { HasherProviderProtocol } from '@app/protocols/hasher-provider';

export class BcryptHasherProvider
  implements HasherProviderProtocol, HasherCompareProviderProtocol {
  async hash(password: string): Promise<string> {
    const salts = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(password, salts);

    return hash;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const isValid = bcrypt.compareSync(hash, password);

    return isValid;
  }
}
