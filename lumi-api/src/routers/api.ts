import express, { Request, Response } from 'express';
import handleUpload from '../helpers/fileUploadHandler';
import extractTextPDF from '../helpers/scrapePDFHandler';
import parsePDFData from '../helpers/parsePDFData';
import { PrismaBillRepository } from '../repositories/implementations/PrismaBillRepository';
import { PrismaCustomerRepository } from '../repositories/implementations/PrismaCustomerRepository';
import { BillService } from '../services/BillService';
import { CustomerService } from '../services/CustomerService';

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

        await new BillService().createBill({pdfData: data, fileName: uploadResult.fileName})

        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(400).json();
    }
});

apiRouter.get('/electricity/:refNumber', async (req : Request, res : Response) => {
    try {
        const billRepository = new PrismaBillRepository()
        const customerRepository = new PrismaCustomerRepository();

        const customer = await customerRepository.findByReferenceNumber(req.params.refNumber)

        if(!customer) throw new Error("Cliente não encontrado")

        const bills = await billRepository.findAllByCustomer(customer.id);
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
