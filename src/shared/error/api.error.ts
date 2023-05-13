export interface HttpApiErrorArgs {
  statusCode: number
  code: string
  message: string
  type: string
}

export class HttpApiErrorResponse extends Error {
  statusCode: number
  timestamp?: string
  code: string
  message: string
  type: string
  public constructor({ statusCode, code, message, type }: HttpApiErrorArgs) {
    super()
    this.name = HttpApiErrorResponse.name
    this.statusCode = statusCode
    this.timestamp = Date.now().toLocaleString()
    this.code = code
    this.message = message
    this.type = type
  }
}
