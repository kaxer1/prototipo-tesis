import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class ConsulController {
  @Get()
  healthCheck() {
    return { status: 'ok' };
  }
}
