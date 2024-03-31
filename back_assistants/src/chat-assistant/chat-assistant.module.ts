import { Module } from '@nestjs/common';
import { ChatAssistantService } from './chat-assistant.service';
import { ChatAssistantController } from './chat-assistant.controller';

@Module({
  controllers: [ChatAssistantController],
  providers: [ChatAssistantService],
})
export class ChatAssistantModule {}
