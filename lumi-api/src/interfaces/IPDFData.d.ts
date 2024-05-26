type electricityData = {
    kwh: string;
    price: string;
} 

interface IPDFData {
    customerNumber: string | null;
    referenceMonth?: string;

    electricity?: electricityData
    electricitySCEE?: electricityData;
    electricityGDI?: electricityData;

    municipalPublicLightingContribution?: string;
}