import type { ICartRepository } from '@/domain';
export const createUpdateCartItem = (repo: ICartRepository) => (bookId: string, quantity: number) =>
  repo.updateItem(bookId, quantity);
