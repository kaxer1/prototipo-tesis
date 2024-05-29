import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as Consul from 'consul';

@Injectable()
export class ConsulService implements OnModuleDestroy {
  private readonly consul: Consul.Consul;
  private readonly serviceId: string;

  constructor() {
    this.consul = new Consul();
    this.serviceId = `nest-service-${process.pid}`;
  }

  async registerService() {
    const hostname = 'localhost';
    const port = 8003;

    const check = {
      http: `http://${hostname}:${port}/health`,
      interval: '10s',
      timeout: '5s',
      deregistercriticalserviceafter: '1m',
    };

    await this.consul.agent.service.register({
      id: this.serviceId,
      name: 'nest-service',
      address: hostname,
      port,
      check,
    });
    console.log('Service registered with Consul');
  }

  async deregisterService() {
    await this.consul.agent.service.deregister(this.serviceId);
    console.log('Service deregistered from Consul');
  }

  async onModuleDestroy() {
    await this.deregisterService();
  }
}
