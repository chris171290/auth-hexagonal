export class AuthPassword {
  constructor(readonly value: string) {
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value.length < 9) {
      throw new Error('Password must be a valid password');
    }
  }
}
