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

function handleEnergyNumbers(value : string) {
    if(!value) return null
    let fixedValue = value.replace(/\./g, "").replace(",", ".")
    return parseFloat(fixedValue)
}

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
        kwh: handleEnergyNumbers(electricityNumbers[0]),
        price:handleEnergyNumbers(electricityNumbers[1])
    }

    // Energia SCEE Isenta
    const electricitySCEENumbers = regexHandler.getNumbersArray(regexList.electricitySCEE);
    result.electricitySCEE = {
        kwh: handleEnergyNumbers(electricitySCEENumbers[0]),
        price: handleEnergyNumbers(electricitySCEENumbers[1])
    }

    // Energia compensada GDI I
    const electricityGDINumbers = regexHandler.getNumbersArray(regexList.electricityGDI);
    result.electricityGDI = {
        kwh: handleEnergyNumbers(electricityGDINumbers[0]),
        price: handleEnergyNumbers(electricityGDINumbers[1])
    }

    // Contribuição Iluminação Pública Municipal
    const municipalArrayNumbers = regexHandler.getNumbersArray(regexList.municipal);
    result.municipalPublicLightingContribution = handleEnergyNumbers(municipalArrayNumbers[0])

    return result
}