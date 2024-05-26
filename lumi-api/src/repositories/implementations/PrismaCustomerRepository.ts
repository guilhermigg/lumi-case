import { PrismaClient, Customer } from '@prisma/client';
import { CustomerRepository } from '../CustomerRepository';

const prisma = new PrismaClient();

export class PrismaCustomerRepository implements CustomerRepository {
  async findAll(): Promise<Customer[]> {
    return prisma.customer.findMany({ include: { bills: true } });
  }

  async findById(id: number): Promise<Customer | null> {
    return prisma.customer.findUnique({
      where: { id },
      include: { bills: true },
    });
  }

  async create(customer: Omit<Customer, 'id'>): Promise<Customer> {
    return prisma.customer.create({
      data: customer,
      include: { bills: true },
    });
  }

  async update(id: number, customer: Partial<Customer>): Promise<Customer> {
    return prisma.customer.update({
      where: { id },
      data: customer,
      include: { bills: true },
    });
  }

  async delete(id: number): Promise<Customer> {
    return prisma.customer.delete({
      where: { id },
      include: { bills: true },
    });
  }
}