import OpenAI from "openai";
import { AssistantCreateParams } from "openai/resources/beta/assistants";

export const createAssistantsUseCase = async( openai: OpenAI, body: AssistantCreateParams) => {

    const myAssistant = await openai.beta.assistants.create(body);
    
    return myAssistant;
}