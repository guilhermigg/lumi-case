import express, { Request, Response } from 'express';
import handleUpload from '../helpers/fileUploadHandler';
import extractTextPDF from '../helpers/scrapePDFHandler';
import parsePDFData from '../helpers/parsePDFData';
import { PrismaCustomerRepository } from '../repositories/implementations/PrismaCustomerRepository';
import billService from '../services/BillService';
import path from 'path'

const apiRouter = express.Router();

apiRouter.get('/healthcheck', (req : Request, res : Response) => {
    return res.sendStatus(200);
});

apiRouter.post('/analysis', async (req : Request, res: Response) => {
    try{
        const uploadResult = await handleUpload(req.files);

        const extractedText = await extractTextPDF(uploadResult.path || "");
        const data : IPDFData = parsePDFData(extractedText.text || "")

        if(!data.customerNumber) throw new Error("Customer number is required");

        await billService.createBill({pdfData: data, fileName: uploadResult.fileName})

        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(400).json();
    }
});

apiRouter.get('/download/:fileName', (req: Request, res: Response) => {
    const filePath = path.join(__dirname, '..', 'uploads');
    const file = `${filePath}/${req.params?.fileName}`;
    return res.download(file); 
})

apiRouter.get('/electricity/:refNumber', async (req : Request, res : Response) => {
    try {
        const bills = await billService.findCustomerBills(req.params?.refNumber)
        return res.status(200).json({bills});
    } catch (e) {
        return res.status(400).json({error: e})
    }
});

apiRouter.get('/customers/', async (req: Request, res: Response) => {
    const customerRepository = new PrismaCustomerRepository();
    const customers = await customerRepository.findAll();
    return res.status(200).json({customers})
})

export default apiRouter;
