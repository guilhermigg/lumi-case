import { Customer } from "@prisma/client";
import { CustomerRepository } from "../repositories/CustomerRepository";
import { PrismaCustomerRepository } from "../repositories/implementations/PrismaCustomerRepository";

class CustomerService {
    customerRepository: CustomerRepository;

    constructor() {
        this.customerRepository = new PrismaCustomerRepository();
    }

    async findCustomerOrCreate(referenceNumber: string) : Promise<Customer> {
        let customer = await this.findCustomer(referenceNumber);

        if(!customer)
            customer = await this.customerRepository.create({
                referenceNumber: referenceNumber,
                name: referenceNumber
            })

        return customer
    } 
    async findCustomer(referenceNumber: string) : Promise<Customer | null> {
        const customer = await this.customerRepository.findByReferenceNumber(referenceNumber);
        return customer;
    }
}

export default new CustomerService();