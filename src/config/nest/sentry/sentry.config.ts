import { ConfigModule, ConfigService } from '@nestjs/config'
import {
  SentryInterceptorOptions,
  SentryModuleAsyncOptions,
} from '@ntegral/nestjs-sentry'
import { StatusCodes } from 'http-status-codes'
import { ApiException } from 'src/shared/error/api.error'

export const SENTRY_MODULE_OPTIONS: SentryModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    const { host: dsn, enabled } = configService.get<{
      host: string
      enabled: boolean
    }>('app.sentry')
    const environment = configService.get<string>('app.node_env')
    return {
      dsn,
      enabled,
      environment,
      debug: true,
    }
  },
  inject: [ConfigService],
}

export const SENTRY_INTERCEPTOR_OPTIONS: SentryInterceptorOptions = {
  filters: [
    {
      type: ApiException,
      filter: (exception: ApiException) => {
        return StatusCodes.INTERNAL_SERVER_ERROR >= exception.statusCode
      },
    },
  ],
}
