import type { CreateDiscountInput, IDiscountRepository, UpdateDiscountInput } from '@/domain';
export const createGetDiscounts = (repo: IDiscountRepository) => () => repo.list();
export const createCreateDiscount = (repo: IDiscountRepository) => (input: CreateDiscountInput) =>
  repo.create(input);
export const createUpdateDiscount =
  (repo: IDiscountRepository) => (id: string, input: UpdateDiscountInput) =>
    repo.update(id, input);
export const createDeleteDiscount = (repo: IDiscountRepository) => (id: string) => repo.delete(id);
