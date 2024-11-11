import { Auth } from '../../domain/models/Auth';
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { SignUpRequest } from './SignUpRequest';

export class SignUp {
  constructor(private readonly repository: IAuthRepository) {}
  async execute(request: SignUpRequest): Promise<Auth> {
    const user = Auth.create({
      email: request.email,
      password: request.password,
      firstName: request.firstName,
      lastName: request.lastName,
      createdAt: request.createdAt,
    });

    const newUser = await this.repository.signUp(user);

    return newUser;
  }
}
