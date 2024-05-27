import { api } from "./api";

class BillService {
    async getCustomerBills(referenceNumber: string) : Promise<IBill[]> {
        const response = await api(`electricity/${referenceNumber}`);  
        if(!response) return [];
        const bills : any[] = response.bills;
        return bills;
    }

    getElectricityData(bills: IBill[]) {
        const electricityConsumptionResult = bills.map((item: { electricityKwh: number, electricitySCEEKwh: number }) => {
            return item.electricityKwh + item.electricitySCEEKwh
        });

        const compensatedElectricity = bills.map((item: { electricityGDIKwh: number }) => item.electricityGDIKwh);
        const totalElectricityKwh = electricityConsumptionResult.reduce((sum:number, current:number) => sum + current, 0);

        return {
            totalElectricityKwh,
            electricityConsumptionResult,
            compensatedElectricity
        }
    }

    getElectricityPrice(bills: IBill[]) {
        // Valor total sem GD
        const electricityResults = bills.map((item: BillItem) => {
        return item.electricityPrice + item.electricitySCEEPrice + item.municipalPublicLightingContribution
        })
        const electricitySCEEResults = bills.map((item: { electricitySCEEPrice: number }) => item.electricitySCEEPrice)

        // Valor total GD I 
        const electricityGDIResults = bills.map((item: { electricityGDIPrice: number }) => item.electricityGDIPrice)

        // Valor total (Energia + SCEE + GDI)
        const totalElectricityPrice = electricityResults.reduce((sum: number, current: number) => sum + current, 0);
        const totalElectricityGDIPrice = electricityGDIResults.reduce((sum: number, current: number) => sum + current, 0);
        const totalElectricitySCEEPrice = electricitySCEEResults.reduce((sum: number, current: number) => sum + current, 0);

        let priceTotal = totalElectricityPrice + totalElectricitySCEEPrice + totalElectricityGDIPrice;
        priceTotal = parseFloat(priceTotal.toFixed(2))
        const priceTotalFormatted = new Intl.NumberFormat().format(priceTotal)

        return {
            priceTotalFormatted,
            electricityResults,
            electricityGDIResults
        }
    }
}

export default new BillService();