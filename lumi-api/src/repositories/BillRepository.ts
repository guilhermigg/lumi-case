import { Bill } from '@prisma/client';

export interface BillRepository {
  findAll(): Promise<Bill[]>;
  findAllByCustomer(customerId: number): Promise<Bill[]>;
  findById(id: number): Promise<Bill | null>;
  create(bill: Omit<Bill, 'id'>): Promise<Bill>;
  update(id: number, bill: Partial<Bill>): Promise<Bill>;
  delete(id: number): Promise<Bill>;
}