import { InvalidArgument } from 'src/context/shared/domain/exceptions/InvalidArgument';

export class AuthFirstName {
  constructor(readonly value: string) {
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    if (!value) {
      throw new InvalidArgument(`${this.constructor.name} is required`);
    }
  }
}
