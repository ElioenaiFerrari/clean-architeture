import { Email } from '../../src/domain/entities/email';

describe('unit/object-values', () => {
  it('success/create-valid-email', () => {
    const email1OrError = Email.create('elioenaiferrari@gmail.com');
    const email2OrError = Email.create('elioenai.ferrari@intelliway.com.br');
    const email3OrError = Email.create('elioenai.ferrari@hotmail.net');

    expect(email1OrError.isRight()).toBe(true);
    expect(email2OrError.isRight()).toBe(true);
    expect(email3OrError.isRight()).toBe(true);
  });

  it('fail/create-invalid-email', () => {
    const email1OrError = Email.create('elioenaiferrari');
    const email2OrError = Email.create('elioenaiferrari@');
    const email3OrError = Email.create('elioenaiferrari@gmail');
    const email4OrError = Email.create('elioenaiferrari@gmail.');

    expect(email1OrError.isLeft()).toBe(true);
    expect(email2OrError.isLeft()).toBe(true);
    expect(email3OrError.isLeft()).toBe(true);
    expect(email4OrError.isLeft()).toBe(true);
  });
});
