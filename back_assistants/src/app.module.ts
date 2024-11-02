import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConsulModule } from './consult/consul.module';
import { ChatAssistantModule } from './chat-assistant/chat-assistant.module';
import { EndpointsOpenaiModule } from './endpoints-openai/endpoints-openai.module';

@Module({
  imports: [
    ChatAssistantModule,
    EndpointsOpenaiModule,
    ConsulModule,
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
