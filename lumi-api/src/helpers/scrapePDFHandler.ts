import fs from 'fs';
import PDFParser from 'pdf-parse';

interface ITextPDF {
    text?: string,
    error?: string
}

export default async function extractTextPDF(pdfPath: string) : Promise<ITextPDF> {
    try{
        const pdfBuffer = fs.readFileSync(pdfPath);
        const pdf = await PDFParser(pdfBuffer);
        const text = pdf.text;
        return {"text": text};
    } catch (e) {
        console.log("[PDF Parser]", e)
        return {"error": "Could not parse PDF file"}
    }
}