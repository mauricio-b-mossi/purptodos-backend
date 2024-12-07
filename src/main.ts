import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  const configService = app.get(ConfigService)
  const port = configService ? configService.get('PORT') : process.env.PORT || 10000;

  await app.listen(port);
}
bootstrap();
