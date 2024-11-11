import { InvalidArgument } from 'src/context/shared/domain/exceptions/InvalidArgument';

export class AuthCreatedAt {
  constructor(readonly value: Date) {
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value > new Date()) {
      throw new InvalidArgument(
        `${this.constructor.name} must be greater than the current date`,
      );
    }
  }
}
