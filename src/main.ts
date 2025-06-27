// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';   // ← Ajoute cette ligne

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // NestFactory et AppModule sont maintenant connus
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
