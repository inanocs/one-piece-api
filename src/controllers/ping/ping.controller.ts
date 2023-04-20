import { Controller, Get } from '@nestjs/common';

@Controller({ path: '/ping' })
export class PingController {
  @Get()
  async getHello() {
    return { message: 'Pong' };
  }
}
