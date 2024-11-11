import { AuthCreatedAt } from '../value-objects/AuthCreatedAt';
import { AuthEmail } from '../value-objects/AuthEmail';
import { AuthFirstName } from '../value-objects/AuthFirstName';
import { AuthId } from '../value-objects/AuthId';
import { AuthLastName } from '../value-objects/AuthLastName';
import { AuthPassword } from '../value-objects/AuthPassword';

export class Auth {
  constructor(
    readonly id: AuthId,
    readonly email: AuthEmail,
    readonly password: AuthPassword,
    readonly firstName: AuthFirstName,
    readonly lastName: AuthLastName,
    readonly createdAt: AuthCreatedAt,
  ) {}

  static create(params: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
  }) {
    return new Auth(
      new AuthId(AuthId.random().value),
      new AuthEmail(params.email),
      new AuthPassword(params.password),
      new AuthFirstName(params.firstName),
      new AuthLastName(params.lastName),
      new AuthCreatedAt(params.createdAt),
    );
  }

  static createCredential(params: { email: string; password: string }) {
    return {
      email: new AuthEmail(params.email),
      password: new AuthPassword(params.password),
    };
  }

  public toPlainObject() {
    return {
      id: this.id.value,
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      createdAt: this.createdAt.value,
    };
  }
}

export type Credentials = Pick<Auth, 'email' | 'password'>;
