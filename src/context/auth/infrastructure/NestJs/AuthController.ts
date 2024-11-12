import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SignIn } from '../../applications/sign-in/SignIn';
import { SignInDto } from './dto/SignIn.dto';
import { UserNotFoundError } from '../../domain/exceptions/UserNotFoundError';
import { AuthGuard } from '@nestjs/passport';
import { SignUp } from '../../applications/sign-up/SignUp';
import { SignUpDto } from './dto/SignUp.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    @Inject('SignIn') private readonly userSignIn: SignIn,
    @Inject('SignUp') private readonly userSingup: SignUp,
    // @Inject('UserGetAll') private readonly userGetAll: UserGetAll,
    // @Inject('UserGetOneById') private readonly userGetOneById: UserGetOneById,
    // @Inject('UserCreate') private readonly userCreate: UserCreate,
    // @Inject('UserEdit') private readonly userEdit: UserEdit,
    // @Inject('UserDelete') private readonly userDelete: UserDelete,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('status')
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getApiStatus(): any {
    return {
      date: new Date(),
      status: 'OK',
    };
  }

  //POST /auth/signin
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async signIn(@Body() signInDto: SignInDto) {
    try {
      return await this.userSignIn.execute(signInDto);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 409,
    description: 'The record already exists.',
  })
  async signUp(@Body() signInDto: SignUpDto) {
    try {
      return (
        await this.userSingup.execute({
          ...signInDto,
          createdAt: new Date(),
        })
      ).toPlainObject();
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
