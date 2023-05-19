import { StatusCodes } from 'http-status-codes'

export interface ApiErrorArgs {
  statusCode: number
  code: string
  message: string
  type: string
}
type ConcreteApiErrorArgs = Omit<ApiErrorArgs, 'statusCode' | 'type'>
export class ApiException extends Error {
  statusCode: number
  timestamp?: string
  code: string
  message: string
  type: string
  public constructor({ statusCode, code, message, type }: ApiErrorArgs) {
    super()
    this.name = ApiException.name
    this.statusCode = statusCode
    this.timestamp = Date.now().toLocaleString()
    this.code = code
    this.message = message
    this.type = type
  }
}

export class ApiNotFoundException extends ApiException {
  public constructor({ code, message }: ConcreteApiErrorArgs) {
    super({
      statusCode: StatusCodes.NOT_FOUND,
      type: 'Not Found',
      code,
      message,
    })
  }
}
