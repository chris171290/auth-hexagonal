import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  // .addBearerAuth()
  .addBearerAuth(
    {
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    },
    'JWTAuthorization',
  )
  .setTitle('HexaAuth - Secure REST API with NestJS')
  .setDescription(
    'Explore the HexaAuth API, built with NestJS and designed using hexagonal architecture. This RESTful API provides secure authentication endpoints. Use our Swagger UI to interact with the API and manage user accounts easily.',
  )
  .setVersion('1.0')
  .addServer('http://localhost:3000/', 'Local environment')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cors())
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
