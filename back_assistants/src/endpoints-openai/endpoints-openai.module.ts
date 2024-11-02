import { Module } from '@nestjs/common';
import { EndpointsOpenaiService } from './endpoints-openai.service';
import { EndpointsOpenaiController } from './endpoints-openai.controller';

@Module({
  controllers: [EndpointsOpenaiController],
  providers: [EndpointsOpenaiService],
})
export class EndpointsOpenaiModule {}
