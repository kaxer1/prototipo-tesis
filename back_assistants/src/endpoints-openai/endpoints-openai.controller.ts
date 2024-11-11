import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseFilePipeBuilder, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EndpointsOpenaiService } from './endpoints-openai.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AssistantCreateParams, AssistantUpdateParams } from 'openai/resources/beta/assistants';
import { join } from 'path';
import { execSync } from 'child_process';
import { Response } from 'express';
import { existsSync } from 'fs';
import { modificarVaribleUseCase, TipoInstalador } from './use-cases';


const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024; //2MB

@Controller('openai')
export class EndpointsOpenaiController {
  
  constructor(private readonly endpointsOpenai: EndpointsOpenaiService) {}

  @Get('isalive')
  healthCheck() {
    return { status: 'ok' };
  }

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

  @Post('delete-file/:vectorstoreid')
  async deleteFile(
    @Param('vectorstoreid') vectorstoreid: string,
  ) {
    return await this.endpointsOpenai.eliminarArchivo(vectorstoreid);
  }

  @Post('crear-asistente')
  async crearAsistenteUsuario(
    @Body() asistenteDto: AssistantCreateParams,
  ) {
    return await this.endpointsOpenai.crearAsistente(asistenteDto);
  }

  @Post('actualizar-asistente/:assistantid')
  async actualizarAsistenteUsuario(
    @Param('assistantid') assistantid: string,
    @Body() asistenteDto: AssistantUpdateParams,
  ) {
    return await this.endpointsOpenai.actualizarAsistente(assistantid, asistenteDto);
  }

  @Post('eliminar-asistente/:assistantid')
  async eliminarAsistenteUsuario(
    @Param('assistantid') assistantid: string,
  ) {
    return await this.endpointsOpenai.eliminarAsistente(assistantid);
  }

  @Get('generar-instalador/:assistantid')
  async generarEjecutable(
    @Param('assistantid') assistantid: string,
    @Res() res: Response) {
    try {
      await modificarVaribleUseCase(assistantid, TipoInstalador.Xamp);
      await this.ejecutaScript(res);
    } catch (error) {
      console.error('Error al ejecutar el comando o enviar el archivo:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('generar-instalador-wordpress/:assistantid')
  async generarEjecutableWordpress(
    @Param('assistantid') assistantid: string,
    @Res() res: Response) {
    try {
      await modificarVaribleUseCase(assistantid, TipoInstalador.Wordpress);
      
      await this.ejecutaScript(res);
    } catch (error) {
      console.error('Error al ejecutar el comando o enviar el archivo:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async ejecutaScript(@Res() res: Response) {
    const command = 'npm run scriptgenerated';
    const commandPath = process.env.PATH_EJECUTABLE;
    const zipFilePath = join(commandPath, 'dist', 'build.zip');

    // Ejecutar el comando en un path específico
    await execSync(command, { cwd: commandPath });

    // Verificar si el archivo ZIP existe
    if (!existsSync(zipFilePath)) {
      throw new HttpException('Archivo no encontrado', HttpStatus.NOT_FOUND);
    }

    // Enviar el archivo ZIP al cliente
    res.download(zipFilePath, 'build.zip', (err) => {
      if (err) {
        throw new HttpException('No se pudo enviar el archivo', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  }

}
