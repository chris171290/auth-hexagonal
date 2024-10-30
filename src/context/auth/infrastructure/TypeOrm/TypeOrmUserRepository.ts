import { Repository } from 'typeorm';
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { TypeOrmUserEntity } from './TypeOrmUserEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../../domain/models/Auth';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException } from '@nestjs/common';
import * as argon from 'argon2';

export class TypeOrmUserRepository implements IAuthRepository {
  constructor(
    @InjectRepository(TypeOrmUserEntity)
    private readonly repository: Repository<TypeOrmUserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(credential: Auth): Promise<{ access_token: string }> {
    const user = await this.repository.findOneBy({
      email: credential.email.value,
    });

    if (!user) return null;

    // compare password
    // console.log(auth.password.value, request.password);
    // const pwMatches = await argon.verify(
    //   credential.password.value,
    //   user.password,
    // );
    const pwMatches = credential.password.value === user.password;
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(parseInt(user.id), user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = process.env.JWT_SECRET;

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
    return {
      access_token: token,
    };
  }

  async signUp(user: Auth): Promise<void> {}
}
