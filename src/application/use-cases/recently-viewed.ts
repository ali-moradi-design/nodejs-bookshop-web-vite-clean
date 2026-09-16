import type { IRecentlyViewedRepository, RecentBookSnapshot } from '@/domain';
export const createReadRecentlyViewed = (repo: IRecentlyViewedRepository) => () => repo.read();
export const createPushRecentlyViewed =
  (repo: IRecentlyViewedRepository) => (book: Omit<RecentBookSnapshot, 'viewedAt'>) =>
    repo.push(book);
