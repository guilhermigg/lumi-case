import express, { Request, Response } from 'express';
import handleUpload from '../helpers/fileUploadHandler';
import extractTextPDF from '../helpers/scrapePDFHandler';
import parsePDFData from '../helpers/parsePDFData';

const apiRouter = express.Router();

apiRouter.get('/healthcheck', (req : Request, res : Response) => {
    
    return res.sendStatus(200);
});

apiRouter.post('/analysis', async (req : Request, res: Response) => {
    const uploadResult = await handleUpload(req.files);

    if(uploadResult.error)
        return res.status(400).json({"error": uploadResult.error});

    const extractedText = await extractTextPDF(uploadResult.path || "");
    if(extractedText.error)
        return res.status(400).json({"error": extractedText.error});

    const data = parsePDFData(extractedText.text || "")

    return res.status(200).json(data);
})

export default apiRouter;
