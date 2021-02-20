import { AppError } from './app';

export class InvalidCredentialsError extends AppError {
  constructor() {
    super(`[InvalidCredentialsError]`);
  }
}
