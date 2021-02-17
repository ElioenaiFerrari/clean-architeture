import { DomainError } from './domain';

export class InvalidFormatError extends DomainError {
  constructor(field: string, value: any) {
    super(`[InvalidFormatError] field: ${field}, value: ${value}`);
  }
}
