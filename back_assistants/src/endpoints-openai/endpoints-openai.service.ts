import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { createAssistantsUseCase, getListModelsUseCase, uploadfileAsistente } from './use-cases';
import { AssistantCreateParams } from 'openai/resources/beta/assistants';

@Injectable()
export class EndpointsOpenaiService {

    private openai = new OpenAI({
        apiKey:  process.env.OPENAI_API_KEY
    })

    async listarModelosOpenAi() {
        return await getListModelsUseCase(this.openai)
    }

    async subirArchivo( file: Express.Multer.File) {
        return await uploadfileAsistente(this.openai, file)
    }

    async crearAsistentePorUsuario(asistenteDto: AssistantCreateParams) {
        return await createAssistantsUseCase(this.openai, asistenteDto)
    }

    

}
