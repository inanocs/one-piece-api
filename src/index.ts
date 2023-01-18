import fastify from 'fastify'
import { CONFIG } from './config/config'
const server = fastify({ logger: true })

//TODO: this will be moved to routes folder
server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

//TODO: this will be moved to server file
server.listen({ port: CONFIG.PORT }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  server.log.info(`Active enviroment: ${CONFIG.NODE_ENV}`)
})
