import { Module } from '@nestjs/common';
import { ChatAssistantModule } from './chat-assistant/chat-assistant.module';
import { ConfigModule } from '@nestjs/config';
import { ConsulModule } from './consult/consul.module';

@Module({
  imports: [
    ChatAssistantModule,
    ConsulModule,
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
