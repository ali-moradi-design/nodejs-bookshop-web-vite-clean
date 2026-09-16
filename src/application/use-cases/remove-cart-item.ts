import type { ICartRepository } from '@/domain';
export const createRemoveCartItem = (repo: ICartRepository) => (bookId: string) =>
  repo.removeItem(bookId);
