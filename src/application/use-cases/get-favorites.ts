import type { IFavoriteRepository } from '@/domain';
export const createGetFavorites = (repo: IFavoriteRepository) => () => repo.list();
