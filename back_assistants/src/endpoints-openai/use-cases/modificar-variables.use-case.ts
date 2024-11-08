import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export enum TipoInstalador {
  Wordpress,
  Xamp
}

export const modificarVaribleUseCase = async( assistantId: string, tipoinstalador: TipoInstalador) => {

    const pathEnvioment = process.env.PATH_EJECUTABLE;
    const filePath = join(pathEnvioment, 'src','environments', 'environment.ts');

    try {
        // Leer el contenido del archivo de manera síncrona
        const data = readFileSync(filePath, 'utf8');
    
        // Modificar el valor de assistantId
        let updatedData = data.replace(/assistantId:\s*'[^']*'/, `assistantId: '${assistantId}'`);
        if (tipoinstalador == TipoInstalador.Wordpress) {
          updatedData = updatedData.replace(/base_url_api:\s*'[^']*'/, `base_url_api: '${process.env.URL_API_BASE}'`);
        }
    
        // Escribir el contenido modificado de nuevo en el archivo de manera síncrona
        writeFileSync(filePath, updatedData, 'utf8');
    
        // Devolver una confirmación de éxito
        return 'OK';
      } catch (err) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error('Error modificando el archivo:', err);
        throw err;
      }
}