import express, { Request, Response } from 'express';
import handleUpload from '../helpers/fileUploadHandler';
import extractTextPDF from '../helpers/scrapePDFHandler';
import parsePDFData from '../helpers/parsePDFData';

const apiRouter = express.Router();

apiRouter.get('/healthcheck', (req : Request, res : Response) => {
    return res.sendStatus(200);
});

apiRouter.post('/analysis', async (req : Request, res: Response) => {
    try{
        const uploadResult = await handleUpload(req.files);
        const extractedText = await extractTextPDF(uploadResult.path || "");
        const data = parsePDFData(extractedText.text || "")

        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(400).json();
    }
})

export default apiRouter;
