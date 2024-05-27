import { Customer } from "@prisma/client"
import { BillRepository } from "../repositories/BillRepository"
import { CustomerRepository } from "../repositories/CustomerRepository"
import { PrismaBillRepository } from "../repositories/implementations/PrismaBillRepository"
import { PrismaCustomerRepository } from "../repositories/implementations/PrismaCustomerRepository"
import { CustomerService } from "./CustomerService"

export class BillService {
    billRepository: BillRepository;
    customerRepository: CustomerRepository;
    customerService: CustomerService;

    constructor() {
        this.billRepository = new PrismaBillRepository()
        this.customerRepository = new PrismaCustomerRepository()
        this.customerService = new CustomerService();
    }

    async createBill({ pdfData, fileName }: { pdfData: IPDFData, fileName: string }) {
        const customer : Customer = await this.customerService.findCustomerOrCreate(pdfData.customerNumber);

        const bill = await this.billRepository.create({
            customerId: customer.id,
            electricityGDIKwh: pdfData.electricityGDI?.kwh,
            electricityKwh: pdfData.electricity?.kwh,
            electricityGDIPrice: pdfData.electricityGDI?.price,
            electricityPrice: pdfData.electricity?.price,
            electricitySCEEKwh: pdfData.electricitySCEE?.kwh,
            electricitySCEEPrice: pdfData.electricitySCEE?.price,
            municipalPublicLightingContribution: pdfData.municipalPublicLightingContribution,
            monthReference: pdfData.referenceMonth,
            billFileName: fileName
        });

        return bill;
    }
}