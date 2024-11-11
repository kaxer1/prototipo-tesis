import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { actualizarAsistenteUseCase, crearAsistenteUseCase, deleteFileAsistente, eliminarAsistenteUseCase, 
    getListModelsUseCase, uploadfileAsistente } from './use-cases';
import { AssistantCreateParams, AssistantUpdateParams } from 'openai/resources/beta/assistants';

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

    async eliminarArchivo( vectorStoreId: string) {
        return await deleteFileAsistente(this.openai, vectorStoreId)
    }

    async crearAsistente(asistenteDto: AssistantCreateParams) {
        return await crearAsistenteUseCase(this.openai, asistenteDto)
    }

    async actualizarAsistente(assistantId: string, asistenteDto: AssistantUpdateParams) {
        return await actualizarAsistenteUseCase(this.openai, assistantId, asistenteDto)
    }

    async eliminarAsistente(assistantId: string ) {
        return await eliminarAsistenteUseCase(this.openai, assistantId)
    }

    

}
