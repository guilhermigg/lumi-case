import RegExHandler from "./regexHandler";

interface IPDFData {
    customerNumber: string | null;
    referenceMonth?: string;

    electricityKwh?: string;
    electricityPrice?: string;

    electricitySCEEKwh?: string;
    electricitySCEEPrice?: string;

    electricityGDIKwh?: string;
    electricityGDIPrice?: string;

    municipalPublicLightingContribution?: string;
    originalText?: string;
}

export default function(text : string) : IPDFData | object {
    const regexHandler = new RegExHandler(text);

    const result : IPDFData = {
        customerNumber: "",
    }

    // Número do Cliente
    const customerNumber = regexHandler.exec('customerNumber', 0);
    if(!customerNumber)
        throw new Error("Número do cliente não identificado");

    result.customerNumber = customerNumber;

    // Mês de Referência
    const referenceMonth = regexHandler.exec('referenceMonth', 0);
    if(!referenceMonth)
        throw new Error("Mês de referência não encontrado")

    result.referenceMonth = referenceMonth;

    // Energia Elétrica
    const electricity : string | null = regexHandler.exec('electricity', 0);

    const electricityArrayNumbers = regexHandler.onlyNumbers(electricity);
    result.electricityKwh = electricityArrayNumbers[0] || ""; 
    result.electricityPrice = electricityArrayNumbers[1] || ""; 

    // Energia SCEE Isenta
    const electricitySCEE : string | null = regexHandler.exec('electricitySCEE', 0);

    const electricitySCEENumbers = regexHandler.onlyNumbers(electricitySCEE);
    result.electricitySCEEKwh = electricitySCEENumbers[0] || ""; 
    result.electricitySCEEPrice = electricitySCEENumbers[1] || ""; 

    // Energia compensada GDI I
    const electricityGDI : string | null = regexHandler.exec('electricityGDI', 0);

    const electricityGDIArrayNumbers = regexHandler.onlyNumbers(electricityGDI) 
    result.electricityGDIKwh = electricityGDIArrayNumbers[0] || ""; 
    result.electricityGDIPrice = electricityGDIArrayNumbers[1] || ""; 

    // Contribuição Iluminação Pública Municipal
    const municipalContribution : string | null = regexHandler.exec('municipal', 0);
    const municipalArrayNumbers = regexHandler.onlyNumbers(municipalContribution);
    result.municipalPublicLightingContribution = municipalArrayNumbers[0] || ""; 

    return result
}