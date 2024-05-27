interface IBill {
    electricityKwh: number;
    electricityPrice: number;
    electricityGDIKwh: number;
    electricityGDIPrice: number;
    electricitySCEEKwh: number;
    electricitySCEEPrice: number;
    municipalPublicLightingContribution: number;

    monthReference: Date;
}

type BillItem = {
  electricityPrice: number;
  electricitySCEEPrice: number;
  municipalPublicLightingContribution: number;
}