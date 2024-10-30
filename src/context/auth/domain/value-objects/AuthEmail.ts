export class AuthEmail {
  constructor(readonly value: string) {
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value.includes('.') || !this.value.includes('@')) {
      throw new Error('Email must be a valid email address');
    }
  }
}
