import { NestFactory } from '@nestjs/core';
import { AppModule } from './config/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('app.port');
  const environment = configService.get<string>('app.node_env');
  await app.listen(PORT, () => {
    logger.log(
      `Active environment: ${environment}, Listening on port: ${PORT}`,
    );
  });
}
void bootstrap();
