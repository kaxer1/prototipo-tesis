import OpenAI from "openai";

export const getListModelsUseCase = async( openai: OpenAI) => {

    const run = await openai.models.list();
    
    return run.data;
}