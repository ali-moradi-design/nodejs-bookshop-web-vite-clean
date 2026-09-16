import type {
  CreateDiscountInput,
  Discount,
  IDiscountRepository,
  UpdateDiscountInput,
} from '@/domain';

export type SaveDiscountInput = CreateDiscountInput & { id?: string | null };

export const createSaveDiscount =
  (repo: IDiscountRepository) =>
  async (input: SaveDiscountInput): Promise<Discount> => {
    const { id, ...payload } = input;
    if (id) return repo.update(id, payload as UpdateDiscountInput);
    return repo.create(payload);
  };
