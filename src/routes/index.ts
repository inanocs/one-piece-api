import { RouteOptions } from 'fastify'
import { pingRoutes } from '@routes/ping/ping.routes.js'

export const routes: RouteOptions[] = [...pingRoutes]
