export class DomainError extends Error {
  public readonly value: string;

  constructor(value: string) {
    super(`[DomainError] ${value}`);

    this.value = `[DomainError] ${value}`;
  }
}
