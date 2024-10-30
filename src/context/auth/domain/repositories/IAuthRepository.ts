import { Auth } from '../models/Auth';

export interface IAuthRepository {
  signIn(credential: Auth): Promise<{ access_token: string }>;
  signUp(user: Auth): Promise<void>;
}
