type electricityData = {
    kwh: Float;
    price: Float;
} 

interface IPDFData {
    customerNumber: string;
    referenceMonth?: DateTime;

    electricity?: electricityData
    electricitySCEE?: electricityData;
    electricityGDI?: electricityData;

    municipalPublicLightingContribution?: Float;
}