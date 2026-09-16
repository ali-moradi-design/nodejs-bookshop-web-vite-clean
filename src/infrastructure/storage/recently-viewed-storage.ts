import type { IRecentlyViewedRepository, RecentBookSnapshot } from '@/domain';

const STORAGE_KEY = 'bookstore-recently-viewed';
const MAX = 8;

export const recentlyViewedStorage: IRecentlyViewedRepository = {
  read() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as RecentBookSnapshot[];
      return Array.isArray(parsed) ? parsed.slice(0, MAX) : [];
    } catch {
      return [];
    }
  },
  push(book) {
    const next: RecentBookSnapshot = { ...book, viewedAt: Date.now() };
    const prev = this.read().filter((b) => b.id !== book.id);
    const list = [next, ...prev].slice(0, MAX);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      /* ignore quota */
    }
    return list;
  },
};
