import { AppError } from './app';

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super(`[UserAlreadyExistsError]`);
  }
}
