import { RouteOptions } from 'fastify'

const getPing: RouteOptions = {
  url: '/ping',
  method: 'GET',
  handler: async (_, reply) => {
    await reply.send({ message: 'Pong' })
  },
}

export const pingRoutes: RouteOptions[] = [getPing]
