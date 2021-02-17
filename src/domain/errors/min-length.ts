import { DomainError } from './domain';

export class MinLengthError extends DomainError {
  constructor(field: string, min: number) {
    super(`[MinLengthError] field: ${field}, min: ${min}`);
  }
}
