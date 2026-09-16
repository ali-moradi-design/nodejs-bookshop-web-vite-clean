import { apiDelete, apiGet, apiPost } from '@/infrastructure/http';
import type { ApiData, ApiMessage } from '@/infrastructure/http';
import type { Favorite, IFavoriteRepository } from '@/domain';

export const favoriteRepositoryHttp: IFavoriteRepository = {
  async list() {
    return (await apiGet<ApiData<Favorite[]>>('/favorites')).data;
  },
  async add(bookId) {
    return (await apiPost<ApiData<Favorite>>('/favorites', { bookId })).data;
  },
  async remove(bookId) {
    await apiDelete<ApiMessage>(`/favorites/${bookId}`);
  },
};
