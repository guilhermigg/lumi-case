import fs from 'fs';
import PDFParser from 'pdf-parse';

interface ITextPDF {
    text?: string,
}

export default async function extractTextPDF(pdfPath: string) : Promise<ITextPDF> {
    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdf = await PDFParser(pdfBuffer);

    return {"text": pdf.text};
}