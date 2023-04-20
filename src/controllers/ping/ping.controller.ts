import { Controller, Get } from '@nestjs/common';

@Controller({ path: '/ping' })
export class PingController {
  @Get()
  getHello() {
    return { message: 'Pong' };
  }
}
