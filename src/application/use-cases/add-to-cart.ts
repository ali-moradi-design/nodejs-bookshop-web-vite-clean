import type { ICartRepository } from '@/domain';
export const createAddToCart = (repo: ICartRepository) => (bookId: string, quantity: number) =>
  repo.addItem(bookId, quantity);
