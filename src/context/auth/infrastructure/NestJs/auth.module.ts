import { Module } from '@nestjs/common';
import { AuthController } from './AuthController';
import { SignIn } from '../../applications/sing-in/SignIn';
import { TypeOrmUserRepository } from '../TypeOrm/TypeOrmUserRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUserEntity } from '../TypeOrm/TypeOrmUserEntity';

import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmUserEntity]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: 'IAuthRepository',
      useClass: TypeOrmUserRepository,
    },

    {
      provide: 'SignIn',
      useFactory: (repository: TypeOrmUserRepository) => new SignIn(repository),
      inject: ['IAuthRepository'],
    },
    // {
    //   provide: 'SignUp',
    //   useFactory: (repository: TypeOrmUserRepository) => new SignIn(repository),
    //   inject: [TypeOrmUserRepository],
    // },
  ],
})
export class AuthModule {}
