import { api } from "./api";

class CustomerService {
    async getCustomers() {
        const result : {customers: ICustomer[]} = await api('customers');
        return result.customers;
    }
}

export default new CustomerService()