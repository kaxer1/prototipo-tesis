import { createReadStream, unlinkSync } from "fs";
import OpenAI from "openai";
import { FsReadStream } from "openai/_shims/auto/types";
import { join } from "path";

export const uploadfileAsistente = async( openai: OpenAI, file: Express.Multer.File) => {

    // Crear un ReadStream del archivo subido
    const filePath = join(__dirname.split("dist")[0], 'uploads', file.originalname);
    const readStream: FsReadStream = createReadStream(filePath);
    
    let vectorStore = await openai.beta.vectorStores.create({
        name: file.filename.split(".")[0] + "-Storages",
    });
    
    const response = await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {files: [readStream]})
    unlinkSync(filePath);
    return response;
}
