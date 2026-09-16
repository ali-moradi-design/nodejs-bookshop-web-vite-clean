import type { CreateDiscountInput, Discount, UpdateDiscountInput } from '../entities';

export interface IDiscountRepository {
  list(): Promise<Discount[]>;
  create(input: CreateDiscountInput): Promise<Discount>;
  update(id: string, input: UpdateDiscountInput): Promise<Discount>;
  delete(id: string): Promise<void>;
}
