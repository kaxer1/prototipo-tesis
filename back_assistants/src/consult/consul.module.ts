import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConsulService } from './consul.service';
import { ConsulController } from './consul.controller';

@Module({
  providers: [ConsulService],
  exports: [ConsulService],
  controllers: [ConsulController]
})
export class ConsulModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly consulService: ConsulService) {}
  
  async onModuleDestroy() {
    await this.consulService.deregisterService();
  }

  async onModuleInit() {
    await this.consulService.registerService();
  }
}
