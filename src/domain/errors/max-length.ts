import { DomainError } from './domain';

export class MaxLengthError extends DomainError {
  constructor(field: string, max: number) {
    super(`[MaxLengthError] field: ${field}, max: ${max}`);
  }
}
