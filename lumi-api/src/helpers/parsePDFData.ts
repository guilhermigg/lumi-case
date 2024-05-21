interface IPDFData {
    customerNumber: string | null;
    referenceMonth?: string;

    eletricityKwh?: string;
    eletricityPrice?: string;

    eletricitySCEEKwh?: string;
    eletricitySCEEPrice?: string;

    eletricityGDIKwh?: string;
    eletricityGDIPrice?: string;

    municipalPublicLightingContribution?: string;
}

export default function(text : string) : IPDFData {
    const regex : RegExp = /N[ºo]\s*DA\s*INSTALAÇÃO\\n\s*(\d{10})/i;
    const match = regex.exec(text);
    const customerNumber : string | null = match ? match[1] : null;

    return {
        customerNumber
    }
}