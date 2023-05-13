import { ArgumentsHost, Catch, Logger } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { FastifyReply } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { HttpApiErrorResponse } from 'src/shared/error/api.error'

@Catch()
export class HttpErrorFilter extends BaseExceptionFilter {
  private readonly logger: Logger = new Logger(HttpErrorFilter.name)
  catch(exception: HttpApiErrorResponse | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<FastifyReply>()
    const DEFAULT_ERROR_RESPONSE = new HttpApiErrorResponse({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      code: 'IE-0000-0001',
      message: exception.message,
      type: exception.name,
    })
    const errorResponse =
      exception instanceof HttpApiErrorResponse
        ? exception
        : DEFAULT_ERROR_RESPONSE

    this.logger.error(`Got error: ${exception.name}: ${exception.message}`)
    this.logger.debug(`Error stack: ${exception.stack}`)
    return res.status(errorResponse.statusCode).send(errorResponse)
  }
}
