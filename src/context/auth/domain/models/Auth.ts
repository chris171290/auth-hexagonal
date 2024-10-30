import { AuthEmail } from '../value-objects/AuthEmail';
import { AuthPassword } from '../value-objects/AuthPassword';

export class Auth {
  constructor(
    readonly email: AuthEmail,
    readonly password: AuthPassword,
  ) {}

  static create(params: { email: string; password: string }) {
    console.log('domain/model/Auth->create', params);
    return new Auth(
      new AuthEmail(params.email),
      new AuthPassword(params.password),
    );
  }
}
