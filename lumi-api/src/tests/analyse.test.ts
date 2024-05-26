
import extractTextPDF from '../helpers/scrapePDFHandler';
import parsePDFData from '../helpers/parsePDFData';

import { describe, expect, beforeAll, test } from 'vitest';

describe("Testando extração de dados da Fatura", () => {
    let pdfText : string | undefined;
    let expectedPdfData : IPDFData = {
            customerNumber: "7005400387",
            electricity: {
                "kwh": "622",
                "price": "0,74860466",
            },
            electricityGDI: {
                "kwh": "767",
                "price": "767",
            },
            electricitySCEE: {
                "kwh": "767",
                "price": "0,65313000",
            },
            municipalPublicLightingContribution: "43,10",
            referenceMonth: "Janeiro/2023",
        }

    beforeAll(() => {

    })

    test('Ler arquivo PDF', async () => {
        const result = await extractTextPDF(__dirname + '/data/fatura_1.pdf'); 
        pdfText = result.text;
        expect(pdfText).toBeDefined();
        expect(pdfText?.trim().split(' ')[0]).toBe("Valores");
    });

    test('Extract info', () => {
        expect(pdfText).toBeDefined();
        const parsedData = parsePDFData(pdfText || "")
        expect(parsedData).toStrictEqual(expectedPdfData);
    })
})