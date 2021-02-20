import { AppError } from './app';

export class NotFoundError extends AppError {
  constructor(value: string) {
    super(`[NotFoundError] ${value}`);
  }
}
