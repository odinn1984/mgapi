import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap()
  .then(() => Logger.log('Server listening on port 3000', 'Main'))
  .catch((err: Error) => Logger.error(err.message, err.stack, 'Main'));
