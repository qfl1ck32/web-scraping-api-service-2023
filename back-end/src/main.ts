import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  const configService = app.get(ConfigService);
  const ip = configService.getOrThrow('app.ip');
  const port = configService.getOrThrow('app.port');
  await app.listen(port, ip);
}

bootstrap();
