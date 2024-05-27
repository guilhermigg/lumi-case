import { RegExHandler, regexList } from "./regexHandler";

const monthsList: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

export default function(text : string) : IPDFData {
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

    let month : string = referenceMonth.split('/')[0];
    let year : number = parseInt(referenceMonth.split('/')[1]);

    result.referenceMonth = new Date(year, monthsList.findIndex(e=> e==month));

    // Energia Elétrica
    const electricityNumbers = regexHandler.getNumbersArray(regexList.electricity);
    result.electricity = {
        kwh: parseFloat(electricityNumbers[0].replace(",", ".")),
        price: parseFloat(electricityNumbers[1].replace(",", "."))
    }

    // Energia SCEE Isenta
    const electricitySCEENumbers = regexHandler.getNumbersArray(regexList.electricitySCEE);
    result.electricitySCEE = {
        kwh: parseFloat(electricitySCEENumbers[0].replace(",", ".")),
        price: parseFloat(electricitySCEENumbers[1].replace(",", "."))
    }

    // Energia compensada GDI I
    const electricityGDINumbers = regexHandler.getNumbersArray(regexList.electricityGDI);
    result.electricityGDI = {
        kwh: parseFloat(electricityGDINumbers[0].replace(",", ".")),
        price: parseFloat(electricityGDINumbers[1].replace(",", "."))
    }

    // Contribuição Iluminação Pública Municipal
    const municipalArrayNumbers = regexHandler.getNumbersArray(regexList.municipal);
    result.municipalPublicLightingContribution = parseFloat(municipalArrayNumbers[0].replace(",", "."));

    return result
}