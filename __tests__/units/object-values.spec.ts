import { Result } from '../../src/shared/result/result';
import { Email } from '../../src/domain/entities/email';

describe('unit/object-values', () => {
  it('success/create-valid-emails', () => {
    const resultOrError = Result.combine([
      Email.create('elioenaiferrari@gmail.com'),
      Email.create('elioenai.ferrari@intelliway.com.br'),
      Email.create('elioenai.ferrari@hotmail.net'),
    ]);

    expect(resultOrError.isRight()).toBe(true);
  });

  it('fail/create-invalid-emails', () => {
    const resultOrError = Result.combine([
      Email.create('elioenaiferrari@gmail'),
      Email.create('elioenai.ferrari@'),
      Email.create('elioenai.ferrari@hotmail.'),
    ]);

    expect(resultOrError.isLeft()).toBe(true);
  });
});
