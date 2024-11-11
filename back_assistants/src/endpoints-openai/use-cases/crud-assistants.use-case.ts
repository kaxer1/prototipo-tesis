import OpenAI from "openai";
import { AssistantCreateParams, AssistantUpdateParams } from "openai/resources/beta/assistants";

export const crearAsistenteUseCase = async( openai: OpenAI, body: AssistantCreateParams) => {

    const myAssistant = await openai.beta.assistants.create(body);
    
    return myAssistant;
}

export const actualizarAsistenteUseCase = async( openai: OpenAI, assistantId: string, body: AssistantUpdateParams) => {

    const myAssistant = await openai.beta.assistants.update(assistantId, body);
    
    return myAssistant;
}

export const eliminarAsistenteUseCase = async( openai: OpenAI, assistantId: string) => {

    const myAssistant = await openai.beta.assistants.del(assistantId);
    
    return myAssistant;
}