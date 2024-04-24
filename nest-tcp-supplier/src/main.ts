import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { port: 9000 },
  });

  process.on('beforeExit', async () => app.close());

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
