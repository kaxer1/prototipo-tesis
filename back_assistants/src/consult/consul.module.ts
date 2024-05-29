import { Module, OnModuleInit } from '@nestjs/common';
import { ConsulService } from './consul.service';
import { ConsulController } from './consul.controller';

@Module({
  providers: [ConsulService],
  exports: [ConsulService],
  controllers: [ConsulController]
})
export class ConsulModule implements OnModuleInit {
  constructor(private readonly consulService: ConsulService) {}

  async onModuleInit() {
    await this.consulService.registerService();
  }
}
