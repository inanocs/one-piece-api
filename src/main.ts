import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './config/nest/app.module'
import { ConfigService } from '@nestjs/config'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { Logger } from '@nestjs/common'
import { HttpErrorFilter } from './shared/error/infra/rest/http-error.filter'

async function bootstrap() {
  const logger = new Logger('main')
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new HttpErrorFilter(httpAdapter))
  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('app.port')
  const environment = configService.get<string>('app.node_env')
  await app.listen(PORT, '0.0.0.0')
  logger.log(`Active environment: ${environment}, Listening on port: ${PORT}`)
}
void bootstrap()
