import { ApiProperty } from '@nestjs/swagger';
import { SignInRequest } from '../../../applications/sign-in/SignInRequest';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto implements Omit<SignInRequest, 'id'> {
  @ApiProperty({
    example: 'christian_santana.r@hotmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456789',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  password: string;
}
