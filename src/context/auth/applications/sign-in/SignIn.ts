import { UserNotFoundError } from '../../domain/exceptions/UserNotFoundError';
import { Auth } from '../../domain/models/Auth';
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { SignInRequest } from './SignInRequest';

export class SignIn {
  constructor(private readonly repository: IAuthRepository) {}

  async execute(request: SignInRequest): Promise<{ access_token: string }> {
    console.log('SignInUseCase:', request);

    const auth = Auth.createCredential(request);

    // find the user by email
    const user = await this.repository.signIn(auth);
    // if user does not exist throw exception
    if (!user) throw new UserNotFoundError('User not found'); // retorna 404

    return user;
  }
}
