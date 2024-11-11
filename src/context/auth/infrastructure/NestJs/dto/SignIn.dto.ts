import { SignInRequest } from '../../../applications/sign-in/SignInRequest';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto implements Omit<SignInRequest, 'id'> {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(9)
  password: string;
}
