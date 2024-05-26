import { RegExHandler, regexList } from "./regexHandler";

export default function(text : string) : IPDFData | object {
    const regexHandler = new RegExHandler(text);

    const result : IPDFData = {
        customerNumber: "",
    }

    // Número do Cliente
    const customerNumber = regexHandler.exec(regexList.customerNumber, 0);
    if(!customerNumber)
        throw new Error("Número do cliente não identificado");

    result.customerNumber = customerNumber.trim();

    // Mês de Referência
    const referenceMonth = regexHandler.exec(regexList.referenceMonth, 0);
    if(!referenceMonth)
        throw new Error("Mês de referência não encontrado")

    result.referenceMonth = referenceMonth;

    // Energia Elétrica
    const electricityNumbers = regexHandler.getNumbersArray(regexList.electricity);
    result.electricity = {
        kwh: electricityNumbers[0] || "",
        price: electricityNumbers[1] || ""
    }

    // Energia SCEE Isenta
    const electricitySCEENumbers = regexHandler.getNumbersArray(regexList.electricitySCEE);
    result.electricitySCEE = {
        kwh: electricitySCEENumbers[0] || "",
        price: electricitySCEENumbers[1] || ""
    }

    // Energia compensada GDI I
    const electricityGDINumbers = regexHandler.getNumbersArray(regexList.electricityGDI);
    result.electricityGDI = {
        kwh: electricityGDINumbers[0] || "",
        price: electricityGDINumbers[0] || ""
    }

    // Contribuição Iluminação Pública Municipal
    const municipalArrayNumbers = regexHandler.getNumbersArray(regexList.municipal)
    result.municipalPublicLightingContribution = municipalArrayNumbers[0] || ""; 

    return result
}