import { FastifyListenOptions } from 'fastify'
import { CONFIG } from '../config/config.js'

export const SERVER_CONFIG: FastifyListenOptions = {
  port: CONFIG.PORT,
  host: CONFIG.HOST,
}
