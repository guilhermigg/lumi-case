import extractTextPDF from '../helpers/scrapePDFHandler';
import parsePDFData from '../helpers/parsePDFData';

import { describe, expect, test } from 'vitest';

describe("extração de dados da fatura", () => {
    let pdfText : string | undefined;

    let expectedPdfData : IPDFData = {
            customerNumber: "7005400387",
            electricity: {
                "kwh": 622,
                "price": 465.66,
            },
            electricityGDI: {
                "kwh": 767,
                "price": -500.89,
            },
            electricitySCEE: {
                "kwh": 767,
                "price": 500.89,
            },
            municipalPublicLightingContribution: 43.1,
            referenceMonth: new Date('2023-01-01T03:00:00.000Z')
        }

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