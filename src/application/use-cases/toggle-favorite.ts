import type { IFavoriteRepository } from '@/domain';

export const createToggleFavorite =
  (repo: IFavoriteRepository) =>
  async (bookId: string, isFavorite: boolean): Promise<void> => {
    if (isFavorite) await repo.remove(bookId);
    else await repo.add(bookId);
  };
