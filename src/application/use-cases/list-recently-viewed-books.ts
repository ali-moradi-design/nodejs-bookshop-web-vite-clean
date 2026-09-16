import type { Book, IRecentlyViewedRepository } from '@/domain';

/** Map recently-viewed snapshots into Book-shaped view models for the home grid. */
export const createListRecentlyViewedBooks =
  (repo: IRecentlyViewedRepository) =>
  (excludeId?: string): Book[] => {
    return repo
      .read()
      .filter((s) => s.id !== excludeId)
      .slice(0, 8)
      .map((s) => ({
        id: s.id,
        title: s.title,
        author: s.author,
        description: '',
        price: s.price,
        currency: s.currency,
        stock: 1,
        coverImageUrl: s.coverImageUrl,
        featured: false,
        createdAt: new Date(s.viewedAt).toISOString(),
        updatedAt: new Date(s.viewedAt).toISOString(),
      }));
  };
