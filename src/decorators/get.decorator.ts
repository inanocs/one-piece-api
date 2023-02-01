import { RouteOptions } from 'fastify'

export function Get(options: RouteOptions) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('TODO: TBD', { target, propertyKey, descriptor, options })
  }
}
