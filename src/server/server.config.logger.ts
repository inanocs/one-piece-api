import { PrettyOptions } from 'pino-pretty'
import { PinoLoggerOptions } from 'fastify/types/logger.js'

const options = {
  translateTime: 'yyyy-mm-dd HH:MM:ss Z',
  ignore: 'pid,hostname',
}
export const LOGGER_CONF: PinoLoggerOptions = {
  level: 'trace',
  transport: {
    target: 'pino-pretty',
    options,
  },
}
