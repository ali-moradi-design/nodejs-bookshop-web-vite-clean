import type { IFavoriteRepository } from '@/domain';
export const createRemoveFavorite = (repo: IFavoriteRepository) => (bookId: string) =>
  repo.remove(bookId);
