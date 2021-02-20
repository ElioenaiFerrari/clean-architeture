export class AppError extends Error {
  public readonly value: string;

  constructor(value: string) {
    super(`[AppError] ${value}`);

    this.value = `[AppError] ${value}`;
  }
}
