import { UploadedFile } from 'express-fileupload';
import path from 'path';

interface IObjetoRetorno {
    path?: string
}

export default async function handleUpload(files : any) : Promise<IObjetoRetorno> {
    if (!files || Object.keys(files).length === 0)
        throw new Error("Nenhum arquivo enviado");

    const file = files.file as UploadedFile;
    const uploadPath = path.join(__dirname, '..', 'uploads', file.name);

    await file.mv(uploadPath);
    return { "path": uploadPath }
}