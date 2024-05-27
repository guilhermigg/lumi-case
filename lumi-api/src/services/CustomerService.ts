import { Customer } from "@prisma/client";
import { CustomerRepository } from "../repositories/CustomerRepository";
import { PrismaCustomerRepository } from "../repositories/implementations/PrismaCustomerRepository";

export class CustomerService {
    customerRepository: CustomerRepository;

    constructor() {
        this.customerRepository = new PrismaCustomerRepository();
    }

    async findCustomerOrCreate(referenceNumber: string) : Promise<Customer> {
        let customer = await this.customerRepository.findByReferenceNumber(referenceNumber)
        if(!customer)
            customer = await this.customerRepository.create({
                referenceNumber: referenceNumber,
                name: "John Doe"
            })

        return customer
    } 
}