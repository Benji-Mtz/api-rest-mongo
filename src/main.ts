import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validacion de DTOS
  app.useGlobalPipes(
    new ValidationPipe({
      // Descarta informacion extra que no esta en el DTO del body
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        // Transforma los numeros a numeros en los query params
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Movies')
    .setDescription('CRUD of Movies')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
