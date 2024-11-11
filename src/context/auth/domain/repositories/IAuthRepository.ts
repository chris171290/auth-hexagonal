import { Auth, Credentials } from '../models/Auth';

export interface IAuthRepository {
  signIn(credential: Credentials): Promise<{ access_token: string }>;
  signUp(user: Auth): Promise<Auth>;
}
