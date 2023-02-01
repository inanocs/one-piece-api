import { RouteOptions } from 'fastify'
import { pingRoutes } from '@infrastructure/rest/routes/ping/ping.routes.js'

export const routes: RouteOptions[] = [...pingRoutes]
