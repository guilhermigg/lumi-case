import fs from 'fs';
const PDFParser = require('pdf-parse-debugging-disabled');
interface ITextPDF {
    text?: string,
}

export default async function extractTextPDF(pdfPath: string) : Promise<ITextPDF> {
    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdf = await PDFParser(pdfBuffer);

    return {"text": pdf.text};
}