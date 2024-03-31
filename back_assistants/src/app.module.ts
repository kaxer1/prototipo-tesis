import { Module } from '@nestjs/common';
import { ChatAssistantModule } from './chat-assistant/chat-assistant.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ChatAssistantModule,
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
