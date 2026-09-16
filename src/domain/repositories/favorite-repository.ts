import type { Favorite } from '../entities';

export interface IFavoriteRepository {
  list(): Promise<Favorite[]>;
  add(bookId: string): Promise<Favorite>;
  remove(bookId: string): Promise<void>;
}
