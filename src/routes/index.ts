import { RouteOptions } from 'fastify'
import { pingRoutes } from './ping/ping.routes.js'

export const routes: RouteOptions[] = [...pingRoutes]
