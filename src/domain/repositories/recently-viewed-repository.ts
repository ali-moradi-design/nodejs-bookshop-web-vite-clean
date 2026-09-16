import type { RecentBookSnapshot } from '../entities';

export interface IRecentlyViewedRepository {
  read(): RecentBookSnapshot[];
  push(book: Omit<RecentBookSnapshot, 'viewedAt'>): RecentBookSnapshot[];
}
