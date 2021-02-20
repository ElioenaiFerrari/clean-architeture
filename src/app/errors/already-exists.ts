import { AppError } from './app';

export class AlreadyExistsError extends AppError {
  constructor(value: string) {
    super(`[AlreadyExistsError] ${value}`);
  }
}
