import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SignIn } from '../../applications/sing-in/SignIn';
import { SingInDto } from './dto/SingIn.dto';
import { UserNotFoundError } from '../../domain/exceptions/UserNotFoundError';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    @Inject('SignIn') private readonly userSignIn: SignIn,
    // @Inject('SingUp') private readonly userSingup: SingUp,
    // @Inject('UserGetAll') private readonly userGetAll: UserGetAll,
    // @Inject('UserGetOneById') private readonly userGetOneById: UserGetOneById,
    // @Inject('UserCreate') private readonly userCreate: UserCreate,
    // @Inject('UserEdit') private readonly userEdit: UserEdit,
    // @Inject('UserDelete') private readonly userDelete: UserDelete,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('status')
  getApiStatus(): any {
    return {
      status: 'OK',
    };
  }

  //POST /auth/signin
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SingInDto) {
    console.log('controller:', signInDto);

    try {
      return await this.userSignIn.execute({ ...signInDto });
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        // console.log(error);
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
