import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

// import { corsOptionsDelegate } from './middleware/corsOptionsDelegate';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //   const app = await NestFactory.create(AppModule, {
  //     cors: corsOptionsDelegate,
  //   });

  const port = 9123;

  await app.listen(port);
}

bootstrap();
