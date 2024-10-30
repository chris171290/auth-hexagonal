import { SignInRequest } from '../../../applications/sing-in/SignInRequest';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SingInDto implements Omit<SignInRequest, 'id'> {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(9)
  password: string;
}
