interface IBill {
    electricityKwh: number;
    electricityPrice: number;
    electricityGDIKwh: number;
    electricityGDIPrice: number;
    electricitySCEEKwh: number;
    electricitySCEEPrice: number;
    municipalPublicLightingContribution: number;

    monthReference: Date;
    billFileName?: string;
}

type BillItem = {
  electricityPrice: number;
  electricitySCEEPrice: number;
  municipalPublicLightingContribution: number;
}