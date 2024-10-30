import { Module } from '@nestjs/common';
import { AuthModule } from './context/auth/infrastructure/NestJs/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmUserEntity } from './context/auth/infrastructure/TypeOrm/TypeOrmUserEntity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: 'root',
      // database: 'test',
      entities: [TypeOrmUserEntity],
      // synchronize: true, //desactivar para produccion, restablece la base de datos
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
