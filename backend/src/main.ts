import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.enableCors({ origin: '*' });
  const buildDirectory = join(__dirname, '..', 'build');
  app.useStaticAssets(buildDirectory);
  app.enableShutdownHooks();

  const port = process.env.PORT;
  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}

bootstrap();
