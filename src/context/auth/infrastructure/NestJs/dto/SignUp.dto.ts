import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { SignUpRequest } from 'src/context/auth/applications/sign-up/SignUpRequest';

export class SignUpDto implements Omit<SignUpRequest, 'createdAt'> {
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
  @IsString()
  @MinLength(9)
  password: string;

  @ApiProperty({
    example: 'Christian',
    required: false,
  })
  @IsString()
  @MinLength(5)
  firstName: string;

  @ApiProperty({
    example: 'Santanas',
    required: false,
  })
  @IsString()
  @MinLength(5)
  lastName: string;
}
