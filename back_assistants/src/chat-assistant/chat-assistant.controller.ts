import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatAssistantService } from './chat-assistant.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('chat-assistant')
export class ChatAssistantController {
  
  constructor(private readonly chatAssistantService: ChatAssistantService) {}

  @Post('create-thread')
  async createThread() {
    return await this.chatAssistantService.createThread();
  }

  @Post('user-question')
  async userQuestion(
    @Body() questionDto: QuestionDto
  ) {
    return await this.chatAssistantService.userQuestion(questionDto);
  }

  @Get('isalive')
  healthCheck() {
    return { status: 'ok' };
  }

}
