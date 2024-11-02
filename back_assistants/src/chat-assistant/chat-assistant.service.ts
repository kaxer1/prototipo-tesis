import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { checkCompleteStatusUseCase, createMessageUseCase, createRunUseCase, createThreadUseCase, getMessageListUseCase } from './use-cases';
import { QuestionDto } from './dtos/question.dto';

@Injectable()
export class ChatAssistantService {

    private openai = new OpenAI({
        apiKey:  process.env.OPENAI_API_KEY
    })

    async createThread() {
        return await createThreadUseCase(this.openai)
    }

    async userQuestion( questionDto: QuestionDto ) {
        const { threadId, question, assistantId } = questionDto;

        const message = await createMessageUseCase(this.openai, { threadId, question })

        const run = await createRunUseCase(this.openai, { threadId, assistantId })

        await checkCompleteStatusUseCase(this.openai, { runId: run.id, threadId: threadId})

        const messages = await getMessageListUseCase(this.openai, {threadId});

        return messages.reverse();
    }

    async getListThreadAnterior(threadId: string) {
        const messages = await getMessageListUseCase(this.openai, {threadId});

        return messages.reverse();
    }

}
