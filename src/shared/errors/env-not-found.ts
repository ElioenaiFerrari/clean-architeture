export class EnvNotFoundError extends Error {
  private value: string;

  constructor(value: string) {
    super(`env ${value} not found`);

    this.value = 'EnvNotFoundError';
  }
}
