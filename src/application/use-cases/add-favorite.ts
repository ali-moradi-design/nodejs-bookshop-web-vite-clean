import type { IFavoriteRepository } from '@/domain';
export const createAddFavorite = (repo: IFavoriteRepository) => (bookId: string) =>
  repo.add(bookId);
