import { Customer } from '@prisma/client';

export interface CustomerRepository {
  findAll(): Promise<Customer[]>;
  findById(id: number): Promise<Customer | null>;
  create(customer: Omit<Customer, 'id'>): Promise<Customer>;
  update(id: number, customer: Partial<Customer>): Promise<Customer>;
  delete(id: number): Promise<Customer>;
}