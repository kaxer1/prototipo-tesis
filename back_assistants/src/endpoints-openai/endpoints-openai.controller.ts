import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseFilePipeBuilder, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EndpointsOpenaiService } from './endpoints-openai.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AssistantCreateParams } from 'openai/resources/beta/assistants';
import { join } from 'path';
import { execSync } from 'child_process';
import { Response } from 'express';
import { existsSync } from 'fs';
import { modificarVaribleUseCase, TipoInstalador } from './use-cases';


const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024; //2MB

@Controller('openai')
export class EndpointsOpenaiController {
  
  constructor(private readonly endpointsOpenai: EndpointsOpenaiService) {}

  @Get('lista-models')
  async listarModels() {
    return await this.endpointsOpenai.listarModelosOpenAi();
  }

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Carpeta donde se guardarán los archivos
      filename: (req, file, cb) => {
        cb(null, file.originalname); // Nombre original del archivo
      }
    })
  }))
  public async uploadFile(@UploadedFile(
    new ParseFilePipeBuilder()
    .addFileTypeValidator({ fileType: 'pdf' })
    .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
    .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
  ) file: Express.Multer.File) {
    return await this.endpointsOpenai.subirArchivo(file);
  }

  @Get('isalive')
  healthCheck() {
    return { status: 'ok' };
  }

  @Post('create-assistant-by-user')
  async createAssistantUser(
    @Body() asistenteDto: AssistantCreateParams
  ) {
    return await this.endpointsOpenai.crearAsistentePorUsuario(asistenteDto);
  }

  @Get('generar-instalador/:assistantid')
  async generarEjecutable(
    @Param('assistantid') assistantid: string,
    @Res() res: Response) {
    const command = 'npm run scriptgenerated';
    const commandPath = process.env.PATH_EJECUTABLE;
    const zipFilePath = join(commandPath, 'dist', 'build.zip');

    try {
      await modificarVaribleUseCase(assistantid, TipoInstalador.Xamp);
      // Ejecutar el comando en un path específico
      await execSync(command, { cwd: commandPath });

      // Verificar si el archivo ZIP existe
      if (!existsSync(zipFilePath)) {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }

      // Enviar el archivo ZIP al cliente
      res.download(zipFilePath, 'build.zip', (err) => {
        if (err) {
          throw new HttpException('Failed to send file', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      });
    } catch (error) {
      console.error('Error executing command or sending file:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('generar-instalador-wordpress/:assistantid')
  async generarEjecutableWordpress(
    @Param('assistantid') assistantid: string,
    @Res() res: Response) {
    const command = 'npm run scriptgenerated';
    const commandPath = process.env.PATH_EJECUTABLE;
    const zipFilePath = join(commandPath, 'dist', 'build.zip');

    try {
      await modificarVaribleUseCase(assistantid, TipoInstalador.Wordpress);
      // Ejecutar el comando en un path específico
      await execSync(command, { cwd: commandPath });

      // Verificar si el archivo ZIP existe
      if (!existsSync(zipFilePath)) {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }

      // Enviar el archivo ZIP al cliente
      res.download(zipFilePath, 'build.zip', (err) => {
        if (err) {
          throw new HttpException('Failed to send file', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      });
    } catch (error) {
      console.error('Error executing command or sending file:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
