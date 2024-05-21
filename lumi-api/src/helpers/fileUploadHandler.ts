import { UploadedFile } from 'express-fileupload';
import path from 'path';

interface IObjetoRetorno {
    error?: string,
    path?: string
}

export default async function handleUpload(files : any) : Promise<IObjetoRetorno> {
    if (!files || Object.keys(files).length === 0)
        return { "error": "Nenhum arquivo enviado" }

    const file = files.file as UploadedFile;
    const uploadPath = path.join(__dirname, '..', 'uploads', file.name);

    try{
      await file.mv(uploadPath);
      return { "path": uploadPath }
    } catch (e) {
      console.log("[ File upload ]", e);
      return { "error": "Não foi possível fazer o upload do arquivo" }
    }
}