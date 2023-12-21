import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.enableCors({ origin: '*' });
  const buildDirectory = join(__dirname, '..', 'build');
  app.useStaticAssets(buildDirectory);
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('PulsePortal API Documentation')
    .setDescription('Detailed documentation of PulsePortal APIs')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT;
  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}

bootstrap();
