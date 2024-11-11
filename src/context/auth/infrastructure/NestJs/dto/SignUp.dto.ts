import { IsEmail, IsString, MinLength } from 'class-validator';
import { SignUpRequest } from 'src/context/auth/applications/sign-up/SignUpRequest';

export class SignUpDto implements Omit<SignUpRequest, 'createdAt'> {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(9)
  password: string;

  @IsString()
  @MinLength(5)
  firstName: string;

  @IsString()
  @MinLength(5)
  lastName: string;
}
