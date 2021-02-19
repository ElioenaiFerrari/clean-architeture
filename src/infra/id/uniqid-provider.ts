import uniqid from 'uniqid';
import { PrimaryKeyProviderProtocol } from '@app/protocols/primary-key-provider';

export class UniqidPrimaryKeyProvider implements PrimaryKeyProviderProtocol {
  async make(): Promise<string | number> {
    return uniqid('clean-', '-architeture');
  }
}
