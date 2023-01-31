import { fastify, FastifyBaseLogger, FastifyInstance } from 'fastify'
import { CONFIG } from '@config/config.js'
import { routes } from '@routes/index.js'
import { SERVER_CONFIG } from '@server/server.config.js'
import { LOGGER_CONF } from '@server/server.config.logger.js'

class Server {
  private readonly server: FastifyInstance
  private readonly logger: FastifyBaseLogger
  constructor() {
    this.server = fastify({ logger: LOGGER_CONF })
    this.logger = this.server.log
  }

  public get serverInstance() {
    return this.server
  }

  public get loggerInstance() {
    return this.logger
  }

  public async Start(): Promise<void> {
    await this.LoadRoutes()
    try {
      await this.server.listen(SERVER_CONFIG)
      this.logger.info(`Active enviroment: ${CONFIG.NODE_ENV}`)
    } catch (err) {
      this.logger.error(err)
      process.exit(1)
    }
  }

  public async Close(): Promise<void> {
    await this.server.close()
  }

  private async LoadRoutes(): Promise<void> {
    routes.forEach((route) => {
      this.logger.info(`Load route ${route.method} ${route.url}`)
      this.server.route(route)
    })
  }
}

export const server = new Server()
export const logger = server.loggerInstance
