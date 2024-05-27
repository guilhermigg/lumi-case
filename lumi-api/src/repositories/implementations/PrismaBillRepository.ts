import { PrismaClient, Bill } from '@prisma/client';
import { BillRepository } from '../BillRepository';

const prisma = new PrismaClient();

export class PrismaBillRepository implements BillRepository {
  async findAll(): Promise<Bill[]> {
    return prisma.bill.findMany();
  }

  async findAllByCustomer(customerId: number): Promise<Bill[]> {
    return prisma.bill.findMany({ where: { customerId } });
  }

  async findById(id: number): Promise<Bill | null> {
    return prisma.bill.findUnique({ where: { id } });
  }

  async create(bill: Omit<Bill, 'id'>): Promise<Bill> {
    return prisma.bill.create({ data: bill });
  }

  async update(id: number, bill: Partial<Bill>): Promise<Bill> {
    return prisma.bill.update({ where: { id }, data: bill });
  }

  async delete(id: number): Promise<Bill> {
    return prisma.bill.delete({ where: { id } });
  }
}