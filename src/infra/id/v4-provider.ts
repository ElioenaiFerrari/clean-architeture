import { v4 } from 'uuid';
import { PrimaryKeyProviderProtocol } from '@app/protocols/primary-key-provider';

export class V4PrimaryKeyProvider implements PrimaryKeyProviderProtocol {
  async make(): Promise<string | number> {
    return v4();
  }
}
