import { CONFIG } from '../config/config.js'
import { fastify, FastifyInstance } from 'fastify'
import { routes } from '../routes/index.js'
import { SERVER_CONFIG } from './server.config.js'
import { LOGGER_CONF } from './server.config.logger.js'

const fastifyInstance = fastify({ logger: LOGGER_CONF })
export const logger = fastifyInstance.log

class Server {
  private readonly server: FastifyInstance
  constructor() {
    this.server = fastifyInstance
  }

  public async Start(): Promise<void> {
    await this.LoadRoutes()
    this.server.listen(SERVER_CONFIG, (err) => {
      if (err) {
        logger.error(err)
        process.exit(1)
      }
      logger.info(`Active enviroment: ${CONFIG.NODE_ENV}`)
    })
  }

  private async LoadRoutes(): Promise<void> {
    routes.forEach((route) => {
      logger.info(`Load route ${route.method} ${route.url}`)
      this.server.route(route)
    })
  }
}

export const server = new Server()
